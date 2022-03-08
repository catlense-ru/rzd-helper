import s from './decision.module.scss'

export default function Decision(props) {
  return(
    <>
      <div className={s.decision}>
        {props.children} - <i>{props.author}</i>
      </div>
    </>
  )
}