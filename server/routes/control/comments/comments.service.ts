import Comment from "../../../models/Comment";

export default class Comments {

  async getAll(): Promise<Object> {
    const response = await Comment.find({})
    return response
  }
  
  async getById(id: string = '1'): Promise<Object> {
    const response = await Comment.findOne({uid: id})
    return response
  }

  async getBySystem(system_id: string = '1'): Promise<Object> {
    return await Comment.find({system_id})
  }

  async isExistsById(id: string = '1'): Promise<boolean> {
    return await Comment.findOne({uid: id}) ? true : false
  }

  async isExistsByName(comment: string): Promise<boolean> {
    return await Comment.findOne({comment}) !== null ? true : false
  }

  async create(comment: string, system_id: string, by: string, by_name: string, train: string): Promise<Object> {
    const comments = new Comment({
      uid: await Comment.count() + 99,
      comment, system_id, by, by_name,
      train
    })

    return await comments.save()
  }

  async edit(comment_id: string, comment: string): Promise<Object> {
    if(!await this.isExistsById(comment_id)) {
      return {status: 'error', message: 'Комментарий не найден'}
    }
    const comments:any = await this.getById(comment_id)
    comments.comment = comment
    await comments.save()
    return {status: 'success', message: 'Успешно изменено'}
  }

}