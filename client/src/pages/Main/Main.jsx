import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import s from './main.module.scss'
import axios from 'axios'
import config from '../../config'
import { useState, useEffect } from "react";
import Decision from "../../components/decision/Decision";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Main(props) {

  const [systems, setSystems] = useState();
  const [system, setSystem] = useState(0);
  const [comments, setComments] = useState();
  const [comment, setComment] = useState(0);
  const [decisions, setDecisions] = useState();
  const [comment_text, setCommentText] = useState('')

  const user = useSelector(state => state.user)

  useEffect(() => {
    axios.get(`${config.api}/control/systems/getAll`).then(({data}) => {
      data.sort((a, b) => {
        if ( a.name.toLowerCase() < b.name.toLowerCase() ){
          return -1;
        }
        if ( a.name.toLowerCase() > b.name.toLowerCase() ){
          return 1;
        }
        return 0;
      })
      setSystems(data)
    })
  }, [])

  useEffect(() => {
    if(system !== 0) {
      axios.get(`${config.api}/control/comments/getBySystem?id=${system}`).then(({data}) => {
        data.sort((a, b) => {
          if ( a.comment.toLowerCase() < b.comment.toLowerCase() ){
            return -1;
          }
          if ( a.comment.toLowerCase() > b.comment.toLowerCase() ){
            return 1;
          }
          return 0;
        })
        setComments(data)
      })
    }
  }, [system])

  useEffect(() => {
    if(comment !== 0) {
      axios.get(`${config.api}/control/decisions/getByComment?id=${comment}`).then(({data}) => {
        setDecisions(data)
      })
      axios.get(`${config.api}/control/comments/getById?id=${comment}`).then(({data}) => {
        if(data.train !== '') {
          setCommentText(`${data.comment} для локомотива ${data.train}`)
        } else {
          setCommentText(`${data.comment}`)
        }
      })
    }
  }, [comment])

  return(
    <>
      <title>{props.title}</title>
      <Header />
      <div className={s.wrapper}>
        <div className={s.selector}>
          <a target="_blank" rel="noreferrer" href="https://chat.whatsapp.com/LVS4gxkE85HDwCHAA77AJ3" className={s.whatsapp}>Техническая поддержка в WhatsApp</a>
          <h1>Помощник поиска неисправностей</h1>
          <p>Система</p>
          <select name="" id="" onChange={(e) => setSystem(e.target.value)}>
            <option value="0">Выберите из списка</option>
            {
              systems ? systems.map(e => <option value={e.uid} key={e.uid}>{e.name}</option>) : null
            }
          </select>
          {
            user.permissions > 1 ? <Link to="/panel/system">Добавить систему</Link> : null 
          }
          <p>Замечание</p>
          <select name="" id="" onChange={({target}) => setComment(target.value)}>
            <option value="0">Выберите из списка</option>  
            {
              comments ? comments.map(e => <option value={e.uid} key={e.uid}>{e.comment}</option>) : null
            }
          </select>
          {
            user.permissions > 0 ? <Link to="/panel/comment">Добавить замечание</Link> : null 
          }
        </div>  
      </div>
      <div className="decisions" style={{marginTop: 100}}>
        <h3 style={{paddingLeft: 15, paddingRight: 15, width: 'calc(100% - 30px)', maxWidth: 1500, margin: '0 auto', marginBottom: 20}}>{comment_text}</h3>
        {
          decisions ? decisions.map(e => <Decision author={e.by_name} uid={e.uid} key={e.uid}>{e.decision}</Decision>) : null
        }
      </div>
      <Footer />
    </>
  )
}