import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Footer from "../../../components/footer/Footer";
import Header from "../../../components/header/Header";
import config from "../../../config";
import s from './edit.module.scss'

export default function Ecomment(props) {

  const [systems, setSystems] = useState();
  const [system, setSystem] = useState(0);

  const [comments, setComments] = useState();
  const [comment, setComment] = useState({id: -1, comment: ''});

  const [name, setName] = useState('')
  const [result, setResult] = useState('')

  const navigate = useNavigate()
  const user = useSelector(state => state.user)
  if(!user.login || user.permissions < 1) { navigate('/') }

  const sendData = () => {
    if(name.trim() === '') return setResult('Напишите замечание')
    axios.post(`${config.api}/control/comments/edit`, {
      comment_id: comment.id,
      comment: name
    }).then(({data}) => {
      setResult(data.message)
    })
  }

  useEffect(() => {
    axios.get(`${config.api}/control/systems/getAll`).then(({data}) => {
      setSystems(data)
    })
  }, [])

  useEffect(() => {
    if (system !== 0) {
      axios.get(`${config.api}/control/comments/getBySystem?id=${system}`).then(({ data }) => {
        setComments(data)
      })
    }
  }, [system])

  return (
    <>
      <title>{props.title}</title>
      <Header />
      <div className={s.editContainer}>
        <h1>Изменить замечание</h1>
        <p>Выберите систему, замечание и ниже напишите новую формулировку замечания</p>
        <select value={system} onChange={({target}) => setSystem(target.value)}>
          <option value="0">Выберите систему</option>
          {
            systems ? systems.map(e => <option value={e.uid} key={e.uid}>{e.name}</option>) : null
          }
        </select>
        <select value={comment.comment} onChange={({ target }) => {
          const index = target.selectedIndex;
          const el = target.childNodes[index]
          setComment({id: el.getAttribute('id'), comment: target.value})
        }}>
          <option value="0">Выберите из списка</option>
          {
            comments ? comments.map(e => <option value={e.comment} id={e.uid} key={e.uid}>{e.comment}</option>) : null
          }
        </select>
        <input type="text" placeholder="Укажите новый текст" value={name} onChange={({ target }) => setName(target.value)} />
        <button onClick={sendData}>Сохранить</button>
        <p>{result}</p>
      </div>
      <Footer />
    </>
  )
}