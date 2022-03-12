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
        // console.log(data.likes.find(e => e.toString() == user.uid), user.uid)
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
      console.log(data)
    })
  }

  return(
    <>
      <div className={s.decision} uid={props.uid}>
        <p>{props.children} - <i>{props.author}</i></p>
        {
          user.login ? 
          <button className={active ? s.active : null} onClick={changeActive}>Полезно</button>
          : null
        }
      </div>
    </>
  )
}