import axios from 'axios'
import { useEffect, useState } from 'react'
import config from '../../../../config'
import s from '../stat.module.scss'

export default function UserTable() {

  const [users, setUsers] = useState()

  useEffect(() => {
    axios.get(`${config.api}/control/stat/users`).then(({data}) => {
      data.sort((a, b) => {
        if ( a.name.toLowerCase() < b.name.toLowerCase() ){
          return -1;
        }
        if ( a.name.toLowerCase() > b.name.toLowerCase() ){
          return 1;
        }
        return 0;
      })
      setUsers(data)
    })
  }, [])

  return(
    <div>
      <Graph by="ФИО" road="Дорога" work="ТРПУ" comments="Замечания" decisions="Решения" />
      {
        users && users.map(e => <Graph by={e.by} road={e.road} work={e.work} decisions={e.decisions} comments={e.comments} />)
      }
    </div>
  )
}

function Graph(props) {
  return(
    <div className={s.graph}>
      <p>{props.by}</p>
      <p>{props.road}</p>
      <p>{props.work}</p>
      <p>{props.comments}</p>
      <p>{props.decisions}</p>
    </div>
  )
}