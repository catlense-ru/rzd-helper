import System from "../../../models/Systems"

export default class Systems {

  async getAll(): Promise<Object> {
    const response = await System.find({})
    return response
  }

  async get(id: string = '1') : Promise<Object> {
    const response = await System.findOne({uid: id})
    return response
  }

  async isExistsByName(name: string = ''): Promise<Object> {
    const response = await System.findOne({name})
    let exists = response ? true : false
    return exists
  }

  async isExistsById(id: string = ''): Promise<Object> {
    const response = await System.findOne({uid: id})
    let exists = response ? true : false
    return exists
  }

  async create(name: string, by: number, by_name: string) {
    const system = new System({
      uid: await System.count() + 99,
      name,
      by,
      by_name
    })

    return await system.save()
  }

}