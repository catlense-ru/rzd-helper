import Decision from "../../../models/Decision"
import Comment from "../../../models/Comment"
import Systems from "../../../models/Systems"

import Comments from '../../../old_db/comments.json'
import Decisions from '../../../old_db/decision.json'
import System from '../../../old_db/systems.json'
import mongoose from "mongoose"
import Export from "../../../models/Export"

export default class DB {

  async dataExport() {
    mongoose.connection.db.listCollections({name: 'exports'}).next(() => {
      mongoose.connection.db.dropCollection('exports', console.log)
    })
    const decisions = await Decision.find({})

    decisions.forEach(async e => {
      const comment:any = await Comment.findOne({uid: e.comment_id})
      if(!comment) return;
      const data = new Export({
        comment: comment.comment,
        decision: e.decision,
        by_comment: comment.by_name,
        by_decision: e.by_name
      })
      await data.save()
    })

    return "ok"

  }

  async transfer() : Promise<Object> {

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


    return {sys: System.length, com: Comments.length, dec: Decisions.length}
  }

}