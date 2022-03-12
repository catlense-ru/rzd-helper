import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Footer from "../../../components/footer/Footer";
import Header from "../../../components/header/Header";
import config from "../../../config";
import s from './edit.module.scss'

export default function Edecision(props) {

  const [systems, setSystems] = useState();
  const [system, setSystem] = useState(0);

  const [comments, setComments] = useState();
  const [comment, setComment] = useState(0);

  const [decisions, setDecisions] = useState()
  const [decision, setDecision] = useState({id: 0, decision: ''})

  const [name, setName] = useState('')
  const [result, setResult] = useState('')

  const navigate = useNavigate()
  const user = useSelector(state => state.user)
  if(!user.login || user.permissions < 1) { navigate('/') }

  const sendData = () => {
    if(name.trim() === '') return setResult('Напишите решение')
    axios.post(`${config.api}/control/decisions/edit`, {
      decision_id: decision.id,
      decision: name
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

  useEffect(() => {
    if(comment !== 0) {
      axios.get(`${config.api}/control/decisions/getByComment?id=${comment}`).then(({data}) => {
        setDecisions(data)
      })
    }
  }, [comment])

  useEffect(() => {
    setName(decision.decision)
  }, [decision])

  return (
    <>
      <title>{props.title}</title>
      <Header />
      <div className={s.editContainer}>
        <h1>Изменить решение</h1>
        <p>Выберите систему, замечание, решение и ниже напишите новую формулировку решения</p>
        <select value={system} onChange={({target}) => setSystem(target.value)}>
          <option value="0">Выберите систему</option>
          {
            systems ? systems.map(e => <option value={e.uid} key={e.uid}>{e.name}</option>) : null
          }
        </select>
        <select value={comment.comment} onChange={({ target }) => setComment(target.value)}>
          <option value="0">Выберите замечание</option>
          {
            comments ? comments.map(e => <option value={e.uid} key={e.uid}>{e.comment}</option>) : null
          }
        </select>
        <select value={decision.decision} onChange={({ target }) => {
          const index = target.selectedIndex;
          const el = target.childNodes[index]
          setDecision({id: el.getAttribute('id'), decision: target.value})
        }}>
          <option value="0">Выберите решение</option>
          {
            decisions ? decisions.map(e => <option value={e.decision} id={e.uid} key={e.uid}>{e.decision}</option>) : null
          }
        </select>
        <textarea type="text" placeholder="Укажите новый текст" value={name} onChange={({ target }) => setName(target.value)} />
        <button onClick={sendData}>Сохранить</button>
        <p>{result}</p>
      </div>
      <Footer />
    </>
  )
}