import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import HeaderButton from '../headerButton/HeaderButton'
import s from './header.module.scss'

export default function Header() {
  const navigate = useNavigate()

  const user = useSelector(state => state.user)

  return(
    <header>
      <Link to="/">На главную</Link>
      <div className={s.buttons}>
        <HeaderButton onClick={() => {user.login ? navigate('/panel') : navigate('/join')}}>{user.login ? 'Панель управления' : 'Вход'}</HeaderButton>
      </div>
    </header>
  )
}