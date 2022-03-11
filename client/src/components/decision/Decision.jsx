import { useState } from 'react'
import { useSelector } from 'react-redux'
import s from './decision.module.scss'

export default function Decision(props) {
  const user = useSelector(state => state.user)
  const [active, setActive] = useState(false)

  const changeActive = () => {
    setActive(prev => !prev)
  }

  return(
    <>
      <div className={s.decision}>
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