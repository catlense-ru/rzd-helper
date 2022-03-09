import axios from 'axios'
import { useState } from 'react'
import Footer from '../../../components/footer/Footer'
import Header from '../../../components/header/Header'
import config from '../../../config'
import s from './export.module.scss'

export default function Export(props) {
  
  const {title} = props
  const [result, setResult] = useState()

  const exportData = () => {
    axios.get(`${config.api}/control/db/export`).then(({data}) => {
      if(data.toString().toLowerCase() === "ok") {
        setResult('Таблица скоро появится на почте e_voronin@mail.ru')
      }
    })
  }
  
  return(
    <>
    <title>{title}</title>
    <Header />
    <div className={s.exportContainer}>
      <button onClick={exportData}>Экспортировать</button>
      <p style={{textAlign: 'center'}}>{result}</p>
    </div>
    <Footer />
    </>
  )
}