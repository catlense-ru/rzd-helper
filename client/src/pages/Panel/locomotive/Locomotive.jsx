import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Footer from "../../../components/footer/Footer";
import Header from "../../../components/header/Header";
import config from "../../../config";
import s from './locomotive.module.scss'

export default function Locomotive(props) {

  const navigate = useNavigate()
  const user = useSelector(state => state.user)
  if(!user.login || user.permissions < 2) { navigate('/') }
  
  const [series, setSeries] = useState()
  const [loco, setLoco] = useState('')
  const [result, setResult] = useState()

  const sendData = () => {
    if(!loco || loco.trim() === '') return setResult('Укажите локомотив')
    axios.post(`${config.api}/control/trains/create`, {
      name: loco
    }).then(({data}) => {
      setResult(data.message)
      setLoco('')
    })
  }

  useEffect(() => {
    axios.get(`${config.api}/control/trains/getAll`).then(({data}) => {
      setSeries(data)
    })
  }, [])

  return(
    <>
    <title>{props.title}</title>
    <Header />
    <div className={s.locomotiveContainer}>
      <h1>Добавление серии локомотива</h1>
      <input type="text" placeholder="Серия локомотива" onChange={({target}) => setLoco(target.value)} value={loco} />
      <button onClick={sendData}>Добавить</button>
      <p>{result}</p>
      <p>Существующие локомотивы:</p>
      {
        series && series.map(e => <p key={e.uid}>• {e.name}</p>)
      }
    </div>
    <Footer />
    </>
  )
}