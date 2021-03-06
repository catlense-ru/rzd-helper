import Decision from "../../../models/Decision"
import Comment from "../../../models/Comment"
import Systems from "../../../models/Systems"

import Comments from '../../../old_db/comments.json'
import Decisions from '../../../old_db/decision.json'
import System from '../../../old_db/systems.json'
import ExportDecisions from "../../../models/ExportDecisions"
import Export from "../../../models/Export"
import nodemailer from 'nodemailer'

import User from "../../../models/User"
import ExportSystems from "../../../models/ExportSystems"

export default class DB {

  async initExport() {
    const users = await User.find({})
    const decisions = await Decision.find({})
    const comments = await Comment.find({})

    for (let x = 0; x <= await Export.count(); x++) {
      await Export.remove().exec()
    }

    users.forEach(async user => {
      let countDecision = 0
      let countComment = 0
      decisions.forEach(decision => {
        decision.by === user.uid && countDecision++
      })

      comments.forEach(comment => {
        comment.by === user.uid && countComment++
      })

      const exportData = new Export({
        uid: user.uid,
        name: user.name,
        surname: user.surname,
        road: user.road,
        work: user.work,
        contact: user.contact,
        decisions: countDecision,
        comments: countComment
      })

      await exportData.save()
    })
  }

  async initDecisionExport() {
    const decisions = await Decision.find({})

    for (let x = 0; x <= await ExportDecisions.count(); x++) {
      await ExportDecisions.remove().exec()
    }

    decisions.forEach(async decision => {
      const comment = await Comment.findOne({uid: decision.comment_id})
      if(!comment) return;
      const system = await Systems.findOne({uid: comment.system_id})
      if(!system) return;

      const exportData = new ExportDecisions({
        uid: decision.uid,
        by_decision: decision.by_name,
        by_comment: comment.by_name,
        system: system.name,
        comment: comment.comment,
        decision: decision.decision,
        likes: decision.likes.length.toString()
      })

      await exportData.save()
    })
  }

  async initSystemsExport() {
    for (let x = 0; x <= await ExportDecisions.count(); x++) {
      await ExportSystems.remove().exec()
    }

    const users = await User.find({})
    const decisions = await Decision.find({})
    const comments = await Comment.find({})
    const systems = await Systems.find({})

    users.forEach(async user => {
      const userResult:any = {
        name: `${user.name} ${user.surname}`,
        road: user.road,
        systems: []
      }
      systems.forEach(async system => {
        let countDecision = 0
        let countComment = 0
        decisions.forEach(async decision => {
          const comment = await Comment.findOne({uid: decision.comment_id})
          if(!comment) return
          (decision.by === user.uid && comment.system_id === system.uid) && countDecision++
        })
        comments.forEach(comment => {
          (comment.by === user.uid && comment.system_id === system.uid) && countComment++
        })
        const sys = {
          system_name: system.name,
          system_id: system.uid,
          decisions: countDecision,
          comments: countComment
        }
        userResult.systems.push(sys)
      })
      const db = new ExportSystems({
        uid: await ExportSystems.count(),
        name: `${user.name} ${user.surname}`,
        road: user.road,
        work: user.work,
        systems: userResult.systems
      })
      await db.save()
    })
  }

  async exportSystems() {
    this.initSystemsExport()
    const exportData = await ExportSystems.find({})
    return exportData
  }

  async exportDecisions() {
    this.initDecisionExport()
    const exportData = await ExportDecisions.find({})

    const fs = require('fs')
    const path = require('path')
    const json2csv = require('json2csv').parse

    const convertCsvToXlsx = require('@aternus/csv-to-xlsx');

    const fields = [
      {
        value: 'by_decision',
        label: '?????????????? ??????????????'
      },
      {
        value: 'by_comment',
        label: '?????????????????? ??????????????'
      },
      {
        value: 'system',
        label: '??????????????'
      },
      {
        value: 'comment',
        label: '??????????????????'
      },
      {
        value: 'decision',
        label: '??????????????'
      },
      {
        value: 'likes',
        label: '?????????????? ??????????????'
      }
    ]

    let csv
    try {
      csv = json2csv(exportData, { fields }, { withBOM: true })
    } catch (err) {
      return err
    }
    const date = Date.now()
    const filePath = path.join(__dirname, 'exports', `decisionexport${date}.csv`)
    if (!fs.existsSync(path.join(__dirname, 'exports'))) {
      fs.promises.mkdir(path.join(__dirname, 'exports'))
    }
    fs.writeFile(filePath, csv, (err: any) => {
      if (err) {
        return console.log(err)
      } else {
        setTimeout(function () {
          fs.unlinkSync(filePath); // delete this file after 30 seconds
        }, 30000)
        let source = filePath
        let destination = path.join(__dirname, 'exports', `decisionexport${date}.xlsx`)
        convertCsvToXlsx(source, destination)
      }
    })
    let smtpTransport = nodemailer.createTransport({
      host: "smtp.yandex.ru",
      port: 465,
      auth: {
        user: "work@voronin.xyz",
        pass: "!ac@Xs3&7s"
      }
    })

    let mail = {
      from: "work@voronin.xyz",
      to: "max@voronin.xyz, e_voronin@mail.ru",
      subject: `?????????????? ???????? ?????????????? ???? ${new Date().toLocaleDateString()}`,
      text: `???????????????????? ???????????????????? ???? ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`,
      attachments: [
        {
          file: "export.xlsx",
          path: path.join(__dirname, 'exports', `decisionexport${date}.xlsx`)
        }
      ]
    }

    smtpTransport.sendMail(mail, (err, res) => {
      if (err) { return console.log(err) }
      console.log(`Message send: ${res.response}`)

      smtpTransport.close()
    })
    return "ok"
  }

  async dataExport() {
    this.initExport()
    const exportData = await Export.find({})

    const fs = require('fs')
    const path = require('path')
    const json2csv = require('json2csv').parse

    const convertCsvToXlsx = require('@aternus/csv-to-xlsx');

    const fields = [
      {
        value: 'name',
        label: '??????'
      },
      {
        value: 'surname',
        label: '??????????????'
      },
      {
        value: 'road',
        label: '????????????'
      },
      {
        value: 'work',
        label: '????????'
      },
      {
        value: 'contact',
        label: '??????????????'
      },
      {
        value: 'comments',
        label: '??????????????????'
      },
      {
        value: 'decisions',
        label: '??????????????'
      }
    ]

    let csv
    try {
      csv = json2csv(exportData, { fields }, { withBOM: true })
    } catch (err) {
      return err
    }
    const date = Date.now()
    const filePath = path.join(__dirname, 'exports', `export${date}.csv`)
    if (!fs.existsSync(path.join(__dirname, 'exports'))) {
      fs.promises.mkdir(path.join(__dirname, 'exports'))
    }
    fs.writeFile(filePath, csv, (err: any) => {
      if (err) {
        return console.log(err)
      } else {
        setTimeout(function () {
          fs.unlinkSync(filePath); // delete this file after 30 seconds
        }, 30000)
        let source = filePath
        let destination = path.join(__dirname, 'exports', `export${date}.xlsx`)
        convertCsvToXlsx(source, destination)
      }
    })
    let smtpTransport = nodemailer.createTransport({
      host: "smtp.yandex.ru",
      port: 465,
      auth: {
        user: "work@voronin.xyz",
        pass: "!ac@Xs3&7s"
      }
    })

    let mail = {
      from: "work@voronin.xyz",
      to: "max@voronin.xyz, e_voronin@mail.ru",
      subject: `?????????????? ???????? ???????????? ???? ${new Date().toLocaleDateString()}`,
      text: `???????????????????? ???????????????????? ???? ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`,
      attachments: [
        {
          file: "export.xlsx",
          path: path.join(__dirname, 'exports', `export${date}.xlsx`)
        }
      ]
    }

    smtpTransport.sendMail(mail, (err, res) => {
      if (err) { return console.log(err) }
      console.log(`Message send: ${res.response}`)

      smtpTransport.close()
    })
    return "ok"
  }

  async transfer(): Promise<Object> {

    Comments.forEach(async c => {
      if (await Comment.findOne({ uid: c.uid })) return;
      const comments = new Comment({
        uid: c.uid,
        comment: c.comment,
        system_id: c.system_id,
        by: 2,
        by_name: c.by_name,
        train: c.train
      })

      await comments.save()
    })

    Decisions.forEach(async c => {
      if (await Decision.findOne({ uid: c.uid })) return;
      const comments = new Decision({
        uid: c.uid,
        comment_id: c.comment_id,
        decision: c.decision,
        by: 2,
        by_name: c.by_name,
      })

      await comments.save()
    })

    System.forEach(async c => {
      if (await Systems.findOne({ uid: c.uid })) return;
      const comments = new Systems({
        uid: c.uid,
        name: c.name,
        by: 2,
        by_name: c.by_name,
      })

      await comments.save()
    })


    return { sys: System.length, com: Comments.length, dec: Decisions.length }
  }

}