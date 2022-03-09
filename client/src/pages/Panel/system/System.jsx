import Footer from "../../../components/footer/Footer";
import Header from "../../../components/header/Header";
import s from './system.module.scss'
import axios from 'axios'
import { useEffect, useState } from "react";
import config from "../../../config";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function System(props) {

  const [systems, setSystems] = useState()
  const [system, setSystem] = useState()
  const [result, setResult] = useState()

  const navigate = useNavigate()
  const user = useSelector(state => state.user)
  if(!user.login || user.permissions < 2) { navigate('/') }

  const sendData = () => {
    if(!system) return setResult('Укажите систему')
    axios.post(`${config.api}/control/systems/create`, {
      name: system,
      by: user.uid,
      by_name: `${user.name} ${user.surname}`
    }).then(({data}) => setResult(data.message))
  }

  useEffect(() => {
    axios.get(`${config.api}/control/systems/getAll`).then(({data}) => {
      setSystems(data)
    })
  }, [])

  return(
    <>
    <title>{props.title}</title>

    <Header />
    <div className={s.systemContainer}>
      <h1>Создать систему</h1>
      <p>Введите название системы</p>
      <input type="text" placeholder="Название системы" onChange={({target}) => setSystem(target.value)} value={system} />
      <button onClick={sendData}>Добавить</button>
      <p>{result}</p>
      <p>Существующие системы:</p>
      {
        systems && systems.map(e => <p key={e.uid}>• {e.name}</p>)
      }
    </div>

    <Footer />
    </>
  )
}