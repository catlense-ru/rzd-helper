import { useEffect, useState } from "react";
import Footer from "../../../components/footer/Footer";
import Header from "../../../components/header/Header";
import User from "../../../components/user/User";
import s from './users.module.scss'
import axios from 'axios'
import config from '../../../config'
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Users(props) {
  
  const navigate = useNavigate()
  const user = useSelector(state => state.user)
  if(!user.login || user.permissions < 2) { navigate('/') }
  
  const [users, setUsers] = useState()
  
  useEffect(() => {
    axios.get(`${config.api}/user/g_a`).then(({data}) => {
      setUsers(data)
    })
  }, [])
  
  
  return(
    <>
    <title>{props.title}</title>
    <Header />
    <div className={s.userContainer}>
      <h1>Информация о пользователях</h1>
      {
        users && `Всего пользователей: ${users.length}`
      }
      {
        users && users.map(e => <User user={e} key={e.uid} />)
      }
    </div>
    <Footer />
    </>
  )
}