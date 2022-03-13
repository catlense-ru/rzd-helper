import axios from 'axios'
import { useState } from 'react'
import Footer from '../../../components/footer/Footer'
import Header from '../../../components/header/Header'
import config from '../../../config'
import s from './export.module.scss'

export default function Export(props) {
  
  const {title} = props
  const [result, setResult] = useState()
  const [resultDecision, setResultDecision] = useState()

  const exportData = () => {
    axios.get(`${config.api}/control/db/export`).then(({data}) => {
      if(data.toString().toLowerCase() === "ok") {
        setResult('Таблица пользователей скоро появится на почте e_voronin@mail.ru')
      }
    })
  }

  const exportDecision = () => {
    axios.get(`${config.api}/control/db/exportdecisions`).then(({data}) => {
      if(data.toString().toLowerCase() === "ok") {
        setResultDecision('Таблица решений скоро появится на почте e_voronin@mail.ru')
      }
    })
  }
  
  return(
    <>
    <title>{title}</title>
    <Header />
    <div className={s.exportContainer}>
      <p>Таблица пользователей</p>
      <button onClick={exportData}>Экспортировать</button>
      <p style={{textAlign: 'center'}}>{result}</p>
      <p style={{marginTop: 50}}>Таблица решений</p>
      <button onClick={exportDecision}>Экспортировать</button>
      <p style={{textAlign: 'center'}}>{resultDecision}</p>
    </div>
    <Footer />
    </>
  )
}