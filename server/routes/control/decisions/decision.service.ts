import Decision from "../../../models/Decision"
import User from "../../../models/User"

export default class Decisions {

  async getAll(): Promise<object> {
    const response = await Decision.find({})
    return response
  }

  async getById(id: string = '1'): Promise<Object> {
    const response = await Decision.findOne({uid: id})
    return response
  }

  async getByComment(comment_id: string = '1'): Promise<Object> {
    return await Decision.find({comment_id})
  }

  async isExistsById(id: string = '1'): Promise<boolean> {
    return await Decision.findOne({uid: id}) ? true : false
  }

  async isExistsByName(decision: string): Promise<boolean> {
    return await Decision.findOne({decision}) !== null
  }

  async create(comment_id: string, decision: string, by: string, by_name: string, photo: string) {    
    const decisions = new Decision({
      uid: await Decision.count() + 99,
      comment_id, decision, by, by_name,
      photo
    })

    return decisions.save()
  }

  async edit(decision_id: string, decision: string) {
    if(!await this.isExistsById(decision_id)) {
      return {status: 'error', message: 'Решение не найдено'}
    }
    const decisions:any = await this.getById(decision_id)
    decisions.decision = decision
    await decisions.save()
    return {status: 'success', message: 'Успешно изменено'}
  }

  async like(uid: string, decision_id: string) {
    const decision = await Decision.findOne({uid: decision_id})
    const user = await User.findOne({uid})
    if(!decision) return {status: 'error', message: 'Решение не найдено'}
    if(!user) return {status: 'error', message: 'Пользователь не найден'}
    let move
    if(decision.likes.find((e: string) => e === uid)) {
      const indexDecision = decision.likes.indexOf(uid)
      const indexUser = user.liked.indexOf(decision_id)
      decision.likes.splice(indexDecision, 1)
      user.liked.splice(indexUser, 1)
      move = 'delete'
    } else {
      user.liked.push(decision_id)
      decision.likes.push(uid)
      move = 'add'
    }

    await decision.save()
    await user.save()

    return {status: 'success', message: 'Успешно', move}

  }

  async getLikes(uid: string = '1') {
    if(!parseInt(uid)) return {status: 'error', message: 'Передайте ID решения'}
    const decision = await Decision.findOne({uid})
    if(!decision) return {status: 'error', message: 'Решение не найдено'}
    return {status: 'success', message: 'успешно', likes: decision.likes}
  }

  async getLiked(uid: string = '1') {
    if(!parseInt(uid)) return {status: 'error', message: 'Передайте ID пользователя'}
    const user:any = await User.findOne({uid})
    if(!user) return {status: 'error', message: 'Пользователь не найден'}
    return {status: 'success', message: 'успешно', liked: user.liked}
  }

  async deleteDecision(uid:any, user_token:any) {
    const decision = await Decision.findOne({uid})
    if(!decision) return {status: 'error', message: 'решение не найдено'}
    decision.hidden = 'hidden'
    await decision.save()
    return {status: 'success', message: 'успешно деактивировано'}
  }

}