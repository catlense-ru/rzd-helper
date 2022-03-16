import s from '../stat.module.scss'
import axios from 'axios'
import { useEffect, useState } from 'react'
import config from '../../../../config'

export default function SystemTable() {

  const [systems, setSystems] = useState()
  const [users, setUsers] = useState()

  useEffect(() => {
    axios.get(`${config.api}/control/systems/getAll`).then(({data}) => {
      setSystems(data)
    })
  }, [])

  useEffect(() => {
    axios.get(`${config.api}/control/stat/systems`).then(({data}) => {
      setUsers(data)
      console.log(data)
    })
  }, [systems])

  return(
    <div className={s.table}>
      <div className={s.graph}>
        <p>ФИО</p>
        {
          systems && systems.map(e => <p key={e.uid}>{e.name}</p>)
        }
      </div>
      {
        users && users.map((e, i) => 
          <div className={s.graph} key={`i${(Math.random() * 100).toFixed(0)}`}>
            <p key={`i${(Math.random() * 100).toFixed(0)}`}>{e.name}</p>
            {
              // JSON.stringify(e.systems[0].system_name)
              e.systems.map(s => <p key={s.system_id}>{s.comments} / {s.decisions}</p>)
              // e.systems[0].system_name
              // e.systems.forEach(s => {
                // <p>test</p>
                // <p key={`i${(Math.random() * 100).toFixed(0)}`}>{s.comments} / {s.decisions}</p>
              // })
              // e.systems && e.systems.map(s => {
              //   <p>test</p>
              //   // <p key={`i${(Math.random() * 100).toFixed(0)}`}>{s.comments} / {s.decisions}</p>
              // })
            }
          </div>
        )
      }
    </div>
  )
}