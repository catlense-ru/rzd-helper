import Trains from "../../../models/Trains"

export default class Train {

  async getAll() {
    const response = await Trains.find({})
    return response
  }

  async get(id: string = '1') : Promise<Object> {
    const response = await Trains.findOne({uid: id})
    return response
  }

  async isExistsByName(name: string = ''): Promise<Object> {
    const response = await Trains.findOne({name})
    let exists = response ? true : false
    return exists
  }

  async isExistsById(id: string = ''): Promise<Object> {
    const response = await Trains.findOne({uid: id})
    let exists = response ? true : false
    return exists
  }

  async create(name: string) {
    const system = new Trains({
      uid: await Trains.count() + 99,
      name
    })

    return await system.save()
  }


}