import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import s from './decision.module.scss'
import axios from 'axios'
import config from '../../config'

export default function Decision(props) {
  const user = useSelector(state => state.user)
  const [active, setActive] = useState(false)

  useEffect(() => {
    axios.get(`${config.api}/control/decisions/getLikes?id=${props.uid}`).then(({data}) => {
      if(data.likes.find(e => e.toString() === user.uid.toString())) {
        setActive(true)
      }
    })
    // eslint-disable-next-line
  }, [])

  const changeActive = () => {
    axios.post(`${config.api}/control/decisions/like`, {
      uid: user.uid.toString(),
      decision_id: props.uid.toString()
    }).then(({data}) => {
      if(data.status === "success") {
        data.move === 'add' ? setActive(true) : setActive(false)
      }
    })
  }

  const onEdit = () => {
    const msg = window.prompt('Введите новый текст замечания', props.children)
    if(msg) {
      axios.post(`${config.api}/control/decisions/edit`, {decision_id: props.uid, decision: msg}).then(({data}) => {
        alert(data.message)
      })
    }
  }

  const onDelete = () => {
    const conf = window.confirm('Вы уверены, что хотите удалить замечание?')
    if(conf) {
      axios.get(`${config.api}/control/decisions/delete?uid=${props.uid}&user_token=1`,).then(({data}) => {
        alert(data.message)
      })
    }
  }

  if(!props.type) {
    return(
      <>
        <div className={s.decision} uid={props.uid}>
          <div>
            <p>{props.children} - <i>{props.author}</i></p>
            {props.image && <img src={`${config.api}/${props.image}`} alt={props.image} />}
          </div>
          
          {
            user.login ? 
            <button className={active ? s.active : null} onClick={changeActive}>Полезно</button>
            : null
          }
        </div>
      </>
    )
  } else if(props.type === 'edit') {
    return(
      <>
        <div className={s.decision} uid={props.uid}>
          <div>
            <p>{props.children} - <i>{props.author}</i></p>
            {props.image && <img src={`${config.api}/${props.image}`} alt={props.image} />}
          </div>
          
          {
            user.login ?
            <>
              <button className={active ? s.active : null} onClick={changeActive}>Полезно</button>
              <button className={s.edit} onClick={onEdit}>Редактировать</button>
              <button className={s.delete} onClick={onDelete}>Удалить</button>
            </> 
            : null
          }
        </div>
      </>
    )
  }
}