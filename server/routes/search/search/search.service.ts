import Comment from "../../../models/Comment";
import Decision from "../../../models/Decision";

export default class Search {
  
  async search(text = '') {
    const decisions = await Decision.find({}, {decision: 1, by_name: 1, comment_id: 1, uid: 1, _id: 0})
    const comments = await Comment.find({}, {comment: 1, uid: 1, _id: 0})
    const result:any = []
    comments.forEach(e => {
      if(e.comment.includes(text)) {
        const dec:any = []
        decisions.forEach(d => {
          if (d.comment_id === e.uid) dec.push({decision: d.decision, by: d.by_name, uid: d.uid})
        })
        const res = {cid: e.uid, comment: e.comment, decisions: dec}
        result.push(res)
      }
    })
    decisions.forEach(e => {
      if(e.decision.includes(text)) {
        result.push({decision: e.decision, by: e.by_name, uid: e.uid})
      }
    })
    if(!decisions && !comments) {
      return {status: 'error', message: 'Поиск не дал результатов'}
    } else {
      return {status: 'success', result}
    }
  }

}