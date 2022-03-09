import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../../../components/footer/Footer";
import Header from "../../../components/header/Header";
import config from "../../../config";
import s from './decision.module.scss'

export default function Decision(props) {

  const navigate = useNavigate()
  const user = useSelector(state => state.user)
  if(!user.login || user.permissions < 1) { navigate('/') }

  const [systems, setSystems] = useState();
  const [system, setSystem] = useState(0);

  const [comments, setComments] = useState();
  const [comment, setComment] = useState(0);

  const [decision, setDecision] = useState('')
  const [result, setResult] = useState('')

  useEffect(() => {
    axios.get(`${config.api}/control/systems/getAll`).then(({ data }) => {
      setSystems(data)
    })
  }, [])

  useEffect(() => {
    console.log(system)
    if (system !== 0) {
      axios.get(`${config.api}/control/comments/getBySystem?id=${system}`).then(({ data }) => {
        setComments(data)
      })
    }
  }, [system])

  const sendData = () => {
    if(!decision || decision.trim() === '') return setResult('Укажите решение')
    axios.post(`${config.api}/control/decisions/create`, {
      comment_id: comment,
      decision: decision,
      by: user.uid,
      by_name: `${user.name} ${user.surname}`,
    }).then(({ data }) => {
      setResult(data.message)
      setDecision('')
    })
  }

  return (
    <>
      <title>{props.title}</title>

      <Header />
      <div className={s.decisionContainer}>
        <h1>Добавление решения</h1>
        <p>Выберите систему</p>
        <select value={system} onChange={({ target }) => setSystem(target.value)}>
          <option value="0">Выберите систему</option>
          {
            systems ? systems.map(e => <option value={e.uid} key={e.uid}>{e.name}</option>) : null
          }
        </select>

        <p>Выберите замечание</p>
        <select name="" id="" onChange={({ target }) => setComment(target.value)} value={comment}>
          <option value="0">Выберите из списка</option>
          {
            comments ? comments.map(e => <option value={e.uid} key={e.uid}>{e.comment}</option>) : null
          }
        </select>
        <Link to="/panel/comment">Добавить замечание</Link>

        <p>Ваше решение</p>
        <textarea placeholder="Напишите одно решение, после сохранения пишите второе и т.д." onChange={({ target }) => setDecision(target.value)} value={decision}></textarea>
        <button onClick={sendData}>Сохранить</button>
        <p>{result}</p>
      </div>
      <Footer />
    </>
  )
}