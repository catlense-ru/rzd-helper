import Comment from "../../../models/Comment";
import Decision from "../../../models/Decision";
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

}