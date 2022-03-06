import Header from "../../components/header/Header";
import {useState} from 'react'
import s from './register.module.scss'
import Footer from "../../components/footer/Footer"
import { Link } from "react-router-dom";

export default function Register(props) {

  const [name, setName] = useState('')
  const [surname, setSurname] = useState('')
  const [phone, setPhone] = useState('')
  const [login, setLogin] = useState('')
  const [work, setWork] = useState('')
  const [road, setRoad] = useState('')
  const [password, setPassword] = useState('')
  const [passwordRepeat, setPasswordRepeat] = useState('')
  const [result, setResult] = useState({status: '', message: ''})

  const sendData = () => {

  }

  return(
    <>
      <title>{props.title}</title>

      <Header />
      <div className={s.regContainer}>
        <h1>Регистрация</h1>
        <div className={s.formData}>
          <input type="text" placeholder="Имя" onChange={({target}) => setName(target.value)} value={name} />
          <input type="text" placeholder="Фамилия" onChange={({target}) => setSurname(target.value)} value={surname} />
          <input type="text" placeholder="Телефон" onChange={({target}) => setPhone(target.value)} value={phone} />
          <input type="text" placeholder="Логин" onChange={({target}) => setLogin(target.value)} value={login} />
          <select onChange={({target}) => setRoad(target.value)} defaultValue="0">
            <option value="0">Выберите дорогу</option>
            <option value="Восточно-Сибирская железная дорога">Восточно-Сибирская железная дорога</option>
            <option value="Горьковская железная дорога">Горьковская железная дорога</option>
            <option value="Дальневосточная железная дорога">Дальневосточная железная дорога</option>
            <option value="Забайкальская железная дорога">Забайкальская железная дорога</option>
            <option value="Западно-Сибирская железная дорога">Западно-Сибирская железная дорога</option>
            <option value="Калининградская железная дорога">Калининградская железная дорога</option>
            <option value="Куйбышевская железная дорога">Куйбышевская железная дорога</option>
            <option value="Московская железная дорога">Московская железная дорога</option>
            <option value="Октябрьская железная дорога">Октябрьская железная дорога</option>
            <option value="Приволжская железная дорога">Приволжская железная дорога</option>
            <option value="Сахалинская железная дорога">Сахалинская железная дорога</option>
            <option value="Свердловская железная дорога">Свердловская железная дорога</option>
            <option value="Северная железная дорога">Северная железная дорога</option>
            <option value="Северо-Кавказская железная дорога">Северо-Кавказская железная дорога</option>
            <option value="Юго-Восточная железная дорога">Юго-Восточная железная дорога</option>
            <option value="Южно-Уральская железная дорога">Южно-Уральская железная дорога</option>
          </select>
          <input type="text" placeholder="Предприятие" onChange={({target}) => setWork(target.value)} value={work} />
          <input type="password" placeholder="Пароль" onChange={({target}) => setPassword(target.value)} value={password} />
          <input type="password" placeholder="Повтор пароля" onChange={({target}) => setPasswordRepeat(target.value)} value={passwordRepeat} />
          <button onClick={sendData}>Зарегистрироваться</button>
          <Link to="/join">Войти</Link>
          <p className={`${s.result} ${s[result.status]}`}>{result.message}</p>
        </div>
      </div>
      <Footer />
    </>
  )
}