import { Link, useNavigate } from "react-router-dom";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import s from './join.module.scss'
import {useState} from 'react'
import axios from 'axios'
import config from "../../config";
import { useSelector } from "react-redux";

export default function Join(props) {
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const [result, setResult] = useState({status: 'error', message: ''})

  const navigate = useNavigate()
  const user = useSelector(state => state.user)

  if(user.login) {
    navigate('/')
  }

  const sendData = () => {
    if(login.trim() === '') return setResult({status: 'error', message: 'Укажите логин'})
    if(password.trim() === '') return setResult({status: 'error', message: 'Укажите пароль'})
    axios.post(
      `${config.api}/user/auth/login`, {
        login, password
      }
    ).then(({data}) => {
      if(data.status === 500) {
        setResult({status: 'error', message: data.message})
      } else {
        localStorage.token = data.token
        setResult({status: 'success', message: 'Вы успешно вошли!'})
        window.location.reload()
        navigate('/')
      }
    })
  }

  return(
    <>
      <title>{props.title}</title>

      <Header />
      <div className={s.joinContainer}>
        <h1>Авторизация</h1>
        <div className={s.formData}>
          <input type="text" placeholder="Логин" onChange={({target}) => setLogin(target.value)} value={login} />
          <input type="password" placeholder="Пароль" onChange={({target}) => setPassword(target.value)} value={password} />
          <button onClick={sendData}>Войти</button>
          <Link to="/register">Зарегистрироваться</Link>
          <p className={`${s.result} ${s[result.status]}`}>{result.message}</p>
        </div>
      </div>
      <Footer />
    </>
  )
}