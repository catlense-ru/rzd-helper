import Footer from "../../../components/footer/Footer";
import Header from "../../../components/header/Header";
import s from './liked.module.scss'
import axios from 'axios'
import config from "../../../config";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Decision from "../../../components/decision/Decision";

export default function Liked(props) {
 
  const navigate = useNavigate()
  const user = useSelector(state => state.user);
  if(!user.uid) { navigate('/') }
  
  const [actualData, setActualData] = useState([])

  useEffect(() => {
    setActualData([])
    if(user.uid !== undefined) {
      axios.get(`${config.api}/control/decisions/getLiked?uid=${user.uid}`).then(({data}) => {
        data.liked.forEach(e => {
          axios.get(`${config.api}/control/decisions/getById?id=${e}`).then(({data}) => {
            setActualData(prev => [...prev, data])
          })
        })
      })
    }
  }, [user.uid])

  return(
    <>
    <title>{props.title}</title>
    <Header />
    <div className={s.likedContainer}>
      <h1>Полезные решения</h1>
      {actualData.length > 0 ? actualData.map(e => <Decision uid={e.uid} key={e.uid} author={e.by_name}>{e.decision}</Decision>) : <p>Вы не отметили ни одно решение полезным</p>}
    </div>
    <Footer />
    </>
  )
}