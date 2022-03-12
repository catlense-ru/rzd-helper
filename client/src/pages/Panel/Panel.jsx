import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import s from './panel.module.scss'

export default function Panel(props) {

  const navigate = useNavigate()
  const user = useSelector(state => state.user)
  if(user.permissions < 1) navigate('/')

  if(user.permissions > 1) {
    return (
      <>
        <title>{props.title}</title>
        <Header />
        <div className={s.mainContainer}>
          <h1>Панель управления</h1>        
          <Link to="/panel/users">Пользователи</Link>
          <Link to="/panel/export">Экспортировать таблицу</Link>
          <Link to="/panel/system">Добавить систему</Link>
          <Link to="/panel/locomotive">Добавить серию локомотива</Link>
          <Link to="/panel/esystem">Изменить систему</Link>
          <Link to="/panel/ecomment">Изменить замечание</Link>
          <Link to="/panel/edecision">Изменить решение</Link>
          <hr/>
          <Link to="/panel/comment">Добавить замечание</Link>
          <Link to="/panel/decision">Добавить решение</Link>
          <Link to="/panel/liked">Полезные решения</Link>
        </div>
        <Footer /> 

      </>
    )
  }

  return(
    <>
      <title>{props.title}</title>
      <Header />
      <div className={s.mainContainer}>
        <h1>Панель управления</h1>        
        <Link to="/panel/decision">Добавить решение</Link>
        <Link to="/panel/liked">Полезные решения</Link>
      </div>
      <Footer /> 
    </>
  )
}