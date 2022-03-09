import Decision from "../../../models/Decision"
import Comment from "../../../models/Comment"
import Systems from "../../../models/Systems"

import Comments from '../../../old_db/comments.json'
import Decisions from '../../../old_db/decision.json'
import System from '../../../old_db/systems.json'
import mongoose from "mongoose"
import Export from "../../../models/Export"

import fs from 'fs'
import path from 'path'
import nodemailer from 'nodemailer'
const json2csv = require('json2csv').parse
// @ts-ignore
import convertCsvToXlsx from '@aternus/csv-to-xlsx'

export default class DB {

  async dataExport() {
    // mongoose.connection.db.listCollections({ name: 'exports' }).next(() => {
    //   mongoose.connection.db.dropCollection('exports', console.log)
    // })
    // const decisions = await Decision.find({})

    // decisions.forEach(async e => {
    //   const comment: any = await Comment.findOne({ uid: e.comment_id })
    //   if (!comment) return;
    //   const data = new Export({
    //     comment: comment.comment,
    //     decision: e.decision,
    //     by_comment: comment.by_name,
    //     by_decision: e.by_name
    //   })
    //   await data.save()
    // })

    const result = await Export.find({})

    const fields = [
      {
        label: 'comment',
        value: 'Замечание'
      },
      {
        label: 'decision',
        value: 'Решение'
      },
      {
        label: 'by_comment',
        value: 'Замечание добавил'
      },
      {
        label: 'by_decision',
        value: 'Решение добавил'
      }
    ]

    let csv = json2csv(result, { fields }, { withBOM: true })

    console.log(csv)
    return

    const date = new Date().toLocaleDateString().replace('.', '-').replace('.', '-') + '-' + new Date().toLocaleTimeString().replace(':', '-').replace(':', '-')
    const filePath = path.join(__dirname, 'exports', `export-${date}.csv`)

    fs.writeFile(filePath, csv, (err) => {
      if (err) {
        return console.log(err)
      } else {
        setTimeout(function () {
          fs.unlinkSync(filePath); // delete this file after 30 seconds
        }, 30000)
        let source = filePath
        let destination = path.join(__dirname, 'exports', `export-${date}.xlsx`)
        convertCsvToXlsx(source, destination)
      }
    })

    let smtpTransport = nodemailer.createTransport({
      host: "smtp.yandex.ru",
      port: 465,
      auth: {
        user: "catlense@voronin.xyz",
        pass: "!ac@Xs3&7s"
      }
    })

    let mail = {
      from: 'catlense@voronin.xyz',
      to: 'max@voronin.xyz',
      subject: `Экспорт базы данных на ${new Date().toLocaleDateString()}`,
      text: 'База данных в виде Excel таблицы',
      attachments: [
        {
          file: `export-${new Date().toLocaleDateString()}.xlsx`,
          path: path.join(__dirname, 'exports', `export-${date}.xlsx`)
        }
      ]
    }

    // smtpTransport.sendMail(mail, (err, res) => {
    //   if(err) return console.log(err)
    //   console.log(`Message send ${res.response}`)
    //   smtpTransport.close()
    // })


    return "ok"

  }

  async transfer(): Promise<Object> {

    // Comments.forEach(async c => {
    //   const comments = new Comment({
    //     uid: c.uid,
    //     comment: c.comment,
    //     system_id: c.system_id,
    //     by: 2,
    //     by_name: c.by_name,
    //     train: c.train
    //   })

    //   await comments.save()
    // })

    // Decisions.forEach(async c => {
    //   const comments = new Decision({
    //     uid: c.uid,
    //     comment_id: c.comment_id,
    //     decision: c.decision,
    //     by: 2,
    //     by_name: c.by_name,
    //   })

    //   await comments.save()
    // })

    // System.forEach(async c => {
    //   const comments = new Systems({
    //     uid: c.uid,
    //     name: c.name,
    //     by: 2,
    //     by_name: c.by_name,
    //   })

    //   await comments.save()
    // })


    return { sys: System.length, com: Comments.length, dec: Decisions.length }
  }

}