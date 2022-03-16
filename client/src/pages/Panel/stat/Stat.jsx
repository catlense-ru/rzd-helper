import { useState } from "react";
import Footer from "../../../components/footer/Footer";
import Header from "../../../components/header/Header";
import s from './stat.module.scss'
import SystemTable from "./tables/SystemTable";
import UserTable from "./tables/UserTable";

export default function Stat(props) {
  const [currentPage, setCurrentPage] = useState('users')
  return(
    <>
    <title>{props.title}</title>
    <Header />
    <div className={s.statContainer}>
      <h1>Статистика сайта</h1>
      <div className={s.switcher}>
        <div className={`${s.btn} ${(currentPage === 'users') && s.active}`} onClick={() => setCurrentPage('users')}>Пользователи</div>
        <div className={`${s.btn} ${(currentPage === 'system') && s.active}`} onClick={() => setCurrentPage('system')}>По системам</div>
      </div>
    </div>
    {
      currentPage === 'users' ? <UserTable /> : null
      // currentPage === 'system' ? <SystemTable /> : null
    }
    <Footer />
    </>
  )
}