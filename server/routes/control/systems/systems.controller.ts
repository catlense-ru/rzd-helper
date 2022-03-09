import express, { Request, Response } from 'express'
import System from './systems.service'

const router = express.Router()

const systems = new System()

router.get('/getAll', async(_: Request, res: Response) => {
  res.status(200).json(await systems.getAll())
})

router.get('/get', async(req: Request, res: Response) => {
  res.status(200).json(await systems.get(req.query.id?.toString()))
})

router.post('/create', async(req: Request, res: Response) => {
  const {name, by, by_name} = req.body
  if(await systems.isExistsByName(name)) {
    return res.status(200).json({status: 'error', message: 'Такая система уже существует'})
  } else {
    await systems.create(name, by, by_name)
    return res.status(201).json({status: 'success', message: 'Успешно создано'})
  }
})

router.post('/edit', async(req: Request, res: Response) => {
  const {id, name} = req.body

  if(!await systems.isExistsById(id)) {
    return res.status(500).json({status: 'error', message: 'Такой системы не существует'})
  } else {
    const system:any = await systems.get(id.toString())
    system.name = name
    await system.save()
    return res.status(200).json({status: 'success', message: 'Успешно изменено'})
  }

})


export default router