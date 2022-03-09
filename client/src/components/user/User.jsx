import s from './user.module.scss'
import axios from 'axios'
import { useEffect, useState } from 'react'
import config from '../../config'

export default function User(props) {
  const {user} = props
  const [permission, setPermission] = useState(-1)

  useEffect(() => {
    if(user && user.uid !== 0 && permission !== -1) {
      axios.get(`${config.api}/user/s_p?uid=${user.uid}&perms=${permission}`).then(({data}) => console.log('response', data))
    } 
    // eslint-disable-next-line
  }, [permission])

  return(
    <div className={s.user}>
      <p>{user.uid}. {user.name} {user.surname}</p>
      <p>{user.login}</p>
      <p>{user.contact}</p>
      <p>{user.work}</p>
      <p>{user.road}</p>
      <p>{user.password}</p>
      <select defaultValue={user.permissions} onChange={({target}) => setPermission(target.value)}>
        <option value="0">Никаких прав</option>
        <option value="1">Обычный пользователь</option>
        <option value="2">Полный доступ</option>
      </select>
    </div>
  )
}