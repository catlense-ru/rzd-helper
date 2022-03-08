import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import s from './main.module.scss'
import axios from 'axios'
import config from '../../config'
import { useState, useEffect } from "react";
import Decision from "../../components/decision/Decision";

export default function Main(props) {

  const [systems, setSystems] = useState();
  const [system, setSystem] = useState(0);
  const [comments, setComments] = useState();
  const [comment, setComment] = useState(0);
  const [decisions, setDecisions] = useState();

  useEffect(() => {
    axios.get(`${config.api}/control/systems/getAll`).then(({data}) => {
      setSystems(data)
    })
  }, [])

  useEffect(() => {
    console.log(system)
    if(system !== 0) {
      axios.get(`${config.api}/control/comments/getBySystem?id=${system}`).then(({data}) => {
        setComments(data)
      })
    }
  }, [system])

  useEffect(() => {
    console.log(comment)
    if(comment !== 0) {
      axios.get(`${config.api}/control/decisions/getByComment?id=${comment}`).then(({data}) => {
        setDecisions(data)
      })
    }
  }, [comment])

  useEffect(() => {
    console.log(decisions)
  }, [decisions])

  return(
    <>
      <title>{props.title}</title>
      <Header />
      <div className={s.wrapper}>
        <div className={s.selector}>
          <h1>Помощник поиска неисправностей</h1>
          <p>Система</p>
          <select name="" id="" onChange={(e) => setSystem(e.target.value)}>
            <option value="0">Выберите из списка</option>
            {
              systems ? systems.map(e => <option value={e.uid} key={e.uid}>{e.name}</option>) : null
            }
          </select>
          <p>Замечание</p>
          <select name="" id="" onChange={({target}) => setComment(target.value)}>
            <option value="0">Выберите из списка</option>  
            {
              comments ? comments.map(e => <option value={e.uid} key={e.uid}>{e.comment}</option>) : null
            }
          </select>
        </div>  
      </div>
      <div className="decisions" style={{marginTop: 100}}>
        {
          decisions ? decisions.map(e => <Decision author={e.by_name} key={e.uid}>{e.decision}</Decision>) : null
        }
      </div>
      <Footer />
    </>
  )
}