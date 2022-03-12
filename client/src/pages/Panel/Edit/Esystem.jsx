import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Footer from "../../../components/footer/Footer";
import Header from "../../../components/header/Header";
import config from "../../../config";
import s from './edit.module.scss'

export default function Esystem(props) {

  const [systems, setSystems] = useState()
  const [system, setSystem] = useState({id: 1, name: ''})
  const [name, setName] = useState('')
  const [result, setResult] = useState('')

  const navigate = useNavigate()
  const user = useSelector(state => state.user)
  if(!user.login || user.permissions < 1) { navigate('/') }

  useEffect(() => {
    axios.get(`${config.api}/control/systems/getAll`).then(({ data }) => {
      data.sort((a, b) => {
        if (a.name.toLowerCase() < b.name.toLowerCase()) {
          return -1;
        }
        if (a.name.toLowerCase() > b.name.toLowerCase()) {
          return 1;
        }
        return 0;
      })
      setSystems(data)
    })
  }, [])

  useEffect(() => {
    setName(system.name)
    console.log(system.id)
  }, [system])

  const sendData = () => {

    axios.post(`${config.api}/control/systems/edit`, {
      id: system.id,
      name
    }).then(({data}) => {
      setResult(data)
    })
  }

  return (
    <>
      <title>{props.title}</title>
      <Header />
      <div className={s.editContainer}>
        <h1>Изменить систему</h1>
        <p>Выберите систему и ниже напишите новое название</p>
        <select onChange={({ target }) => {
          const index = target.selectedIndex;
          const el = target.childNodes[index]
          setSystem({id: el.getAttribute('id'), name: target.value})
        }} value={system.name}>
          <option value="0">Выберите систему</option>
          {
            systems && systems.map(e => <option key={e.uid} id={e.uid} value={e.name}>{e.name}</option>)
          }
        </select>
        <input type="text" placeholder="Укажите название системы" value={name} onChange={({ target }) => setName(target.value)} />
        <button onClick={sendData}>Сохранить</button>
        <p>{result.message}</p>
      </div>
      <Footer />
    </>
  )
}