import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import Footer from "../../../components/footer/Footer"
import Header from "../../../components/header/Header"
import config from "../../../config";
import s from './decision.module.scss'

export default function Decisions(props) {

  const { id } = useParams()

  const navigate = useNavigate()
  const user = useSelector(state => state.user)
  if(!user.login || user.permissions < 1) { navigate('/') }

  const [comment, setComment] = useState('')
  const [decision, setDecision] = useState('')
  const [result, setResult] = useState('')

  useEffect(() => {
    axios.get(`${config.api}/control/comments/getById?id=${id}`).then(({data}) => setComment(data))
  }, [])

  const sendData = () => {
    if(!decision || decision.trim() === '') return setResult('Укажите решение')
    axios.post(`${config.api}/control/decisions/create`, {
      comment_id: id,
      decision: decision,
      by: user.uid,
      by_name: `${user.name} ${user.surname}`
    }).then(({data}) => {
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
        Замечание: <b>{comment.comment}</b>
        <p>Ваше решение</p>
        <textarea placeholder="Напишите одно решение, после сохранения пишите второе и т.д." onChange={({ target }) => setDecision(target.value)} value={decision}></textarea>
        <button onClick={sendData}>Сохранить</button>
        <p>{result}</p>
      </div>
      <Footer />
    </>
  )
}