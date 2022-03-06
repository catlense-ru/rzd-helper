import User from "../../../models/User";
import {v4} from 'uuid'

export default class Auth {

  async registration(name: string, surname: string, login: string, work: string, password: string, contact: string) : Promise<Object> {
    
    const userExist = await User.findOne({login, password})
    
    if(userExist) {
      return {status: 500, message: 'Пользователь уже существует'}
    }

    const user = new User({
      uid: await User.count() + 1,
      name,
      surname,
      login,
      work,
      password,
      permissions: 0,
      contact,
      token: v4(),
      stat: [
        {joined: 1},
        {comments: 0, decisions: 0}
      ]
    })

    await user.save()

    return {status: 201, user}
  }

  async login(login: string, password: string) : Promise<Object> {

    const user = await User.findOne({login, password})

    if(!user) {
      return {status: 500, message: 'Пользователь не найден'}
    }

    return user

  }

}