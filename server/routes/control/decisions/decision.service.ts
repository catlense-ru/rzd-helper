import Decision from "../../../models/Decision"

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
    return await Decision.findOne({decision}) !== null ? true : false
  }

  async create(comment_id: string, decision: string, by: string, by_name: string) {    
    const decisions = new Decision({
      uid: await Decision.count() + 99,
      comment_id, decision, by, by_name
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

}