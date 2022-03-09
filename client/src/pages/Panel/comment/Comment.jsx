import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Footer from "../../../components/footer/Footer";
import Header from "../../../components/header/Header";
import config from "../../../config";
import s from './comment.module.scss'

export default function Comment(props) {
  const [systems, setSystems] = useState();
  const [system, setSystem] = useState(0);

  const [trains, setTrains] = useState();
  const [train, setTrain] = useState(0)

  const [comment, setComment] = useState('')
  const [decision, setDecision] = useState('')

  const [result, setResult] = useState('')

  const navigate = useNavigate()
  const user = useSelector(state => state.user)
  if(!user.login || user.permissions < 1) { navigate('/') }

  useEffect(() => {
    axios.get(`${config.api}/control/systems/getAll`).then(({data}) => {
      setSystems(data)
    })
  }, [])

  useEffect(() => {
    axios.get(`${config.api}/control/trains/getAll`).then(({data}) => {
      setTrains(data)
    })
  }, [])

  useEffect(() => {
    console.log(system, train)
  }, [system, train])

  const saveMore = () => {
    if(!system || system.trim() === '0') return setResult('Укажите систему')
    if(!train || train.trim() === '0') return setResult('Укажите локомотив')
    if(!comment || comment.trim() === '') return setResult('Укажите замечание')
    if(!decision || decision.trim() === '') return setResult('Укажите решение')

    axios.post(`${config.api}/control/comments/create`, {
      comment: comment,
      system_id: system,
      by: user.uid,
      by_name: `${user.name} ${user.surname}`,
      train: train
    }).then(({data}) => {
      if(data.status === 'error') return setResult(data.message)
      let uid = data.uid
      axios.post(`${config.api}/control/decisions/create`, {
        comment_id: data.uid,
        decision: decision,
        by: user.uid,
        by_name: `${user.name} ${user.surname}`,
      }).then(({data}) => {
        setResult(data.message)
        navigate(`/panel/decisions/${uid}`)
      })
    })
  }

  const saveOne = () => {
    if(!system || system.trim() === '0') return setResult('Укажите систему')
    if(!train || train.trim() === '0') return setResult('Укажите локомотив')
    if(!comment || comment.trim() === '') return setResult('Укажите замечание')
    if(!decision || decision.trim() === '') return setResult('Укажите решение')
    axios.post(`${config.api}/control/comments/create`, {
      comment: comment,
      system_id: system,
      by: user.uid,
      by_name: `${user.name} ${user.surname}`,
      train: train
    }).then(({data}) => {
      if(data.status === 'error') return setResult(data.message)
      axios.post(`${config.api}/control/decisions/create`, {
        comment_id: data.uid,
        decision: decision,
        by: user.uid,
        by_name: `${user.name} ${user.surname}`,
      }).then(({data}) => {
        setResult(data.message)
      })
    })
  }

  return(
    <>
    <title>{props.title}</title>
    <Header />

    <div className={s.commentContainer}>
      <h1>Добавление замечания</h1>
      <p>Выберите систему</p>
      <select value={system} onChange={({target}) => setSystem(target.value)}>
        <option value="0">Выберите систему</option>
        {
          systems ? systems.map(e => <option value={e.uid} key={e.uid}>{e.name}</option>) : null
        }
      </select>
      <p>Выберите серию локомотива</p>
      <select value={train} onChange={({target}) => setTrain(target.value)}>
        <option value="0">Выберите серию локомотива</option>
        {
          trains ? trains.map(e => <option value={e.name} key={e.uid}>{e.name}</option>) : null
        }
      </select>
      <p>Напишите замечание</p>
      <textarea placeholder="Укажите Ваше замечание" onChange={({target}) => setComment(target.value)} value={comment}></textarea>

      <p>Напишите решение</p>
      <textarea placeholder="Здесь пишется одно из решений. Если их несколько - напишите первое и нажмите на кнопку «Сохранить и добавить ещё»" onChange={({target}) => setDecision(target.value)} value={decision}></textarea>

      <button className={s.saveMore} onClick={saveMore}>Сохранить и добавить ещё</button>
      <button onClick={saveOne}>Сохранить</button>
      <p>{result}</p>
    </div>

    <Footer />
    </>
  )
}