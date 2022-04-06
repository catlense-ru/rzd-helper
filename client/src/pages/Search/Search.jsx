import axios from "axios";
import { useState } from "react";
import Decision from "../../components/decision/Decision";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import config from "../../config";
import s from './search.module.scss'

export default function Search(props) {

  const [search, setSearch] = useState("")
  const [results, setResults] = useState()

  const sendData = () => {
    axios.get(`${config.api}/search/search?s=${search}`).then(({data}) => {
      setResults(data.result)
      // console.log(data.result)
    })
  }

  return(
    <>
      <title>{props.title}</title>

      <Header />
      <div className={s.wrapper}>
        <h1>Введите Ваш запрос</h1>
        <input placeholder="Поиск" value={search} onChange={({target}) => setSearch(target.value)} />
        <button onClick={sendData} className={s.send}>Поиск</button>
        {
          results && results.length < 1 && <p>Ваш поиск не дал результатов</p>
        }
        {
          results ? results.map(e => {
            console.log(e.decisions)
            if(e.comment) {
              return <>
                <p style={{borderTop: '1px solid #eee', paddingTop: 15, marginTop: 15}}><b>{e.comment}</b></p>
                {e.decisions.map(e => {return <Decision author={e.by} uid={e.uid} image={e.photo}>{e.decision}</Decision>})}
              </>
            } else {
              return <Decision author={e.by} uid={e.uid}>{e.decision}</Decision>
            }
          }) : null
        }
      </div>
      <Footer />
    </>
  )
}

/*

*/
