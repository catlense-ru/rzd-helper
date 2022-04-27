import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Decision from "../../../components/decision/Decision";
import Footer from "../../../components/footer/Footer";
import Header from "../../../components/header/Header";
import config from "../../../config";

export default function MyDecisions(props) {

  const [userDecisions, setUserDecisions] = useState()
  const user = useSelector(state => state.user)
  console.log(user)

  useEffect(() => {
    if(user.uid) axios.get(`${config.api}/control/decisions/getByUser?uid=${user.uid}`).then(({data}) => setUserDecisions(data.message))
  }, [user.uid])

  console.log(userDecisions)

  return(
    <>
      <title>{props.title}</title>

      <Header />

      {
        userDecisions && userDecisions.map(e => {
          if(e.hidden === 'hidden') return;
          return <Decision type="edit" uid={e.uid} key={e.uid} author={e.by_name} image={e.photo}>{e.decision}</Decision>
        })
      }

      <Footer />
    </>
  )
}