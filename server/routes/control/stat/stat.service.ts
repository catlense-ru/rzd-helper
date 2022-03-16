import Comment from "../../../models/Comment";
import Decision from "../../../models/Decision";
import Systems from "../../../models/Systems";
import User from "../../../models/User";

export default class Stat {

  async getUsers() {
    const users = await User.find({})
    const decisions = await Decision.find({})
    const comments = await Comment.find({})
    let result:any[] = []

    users.forEach(async user => {
      let countDecision = 0
      let countComment = 0
      decisions.forEach(decision => {
        decision.by === user.uid && countDecision++
      })
      comments.forEach(comment => {
        comment.by === user.uid && countComment++
      })
      const arr = {
        by: `${user.name} ${user.surname}`,
        road: user.road,
        work: user.work,
        decisions: countDecision,
        comments: countComment
      }
      result.push(arr)
    })
    return result
  }

  async getSystems() {
    const users = await User.find({})
    const decisions = await Decision.find({})
    const comments = await Comment.find({})
    const systems = await Systems.find({})
    let result:any[] = []

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
      result.push(userResult)
    })
    
    return result
  }

}