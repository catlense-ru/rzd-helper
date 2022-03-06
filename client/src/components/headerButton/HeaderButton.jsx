import s from './headerButton.module.scss'

export default function Button(props) {
  return(
    <button className={s.headerButton} onClick={props.onClick}>{props.children}</button>
  )
}