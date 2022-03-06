import { Link } from 'react-router-dom'
import s from './footer.module.scss'
import catlenseLogo from '../../assets/images/catlense-logo.svg'

export default function Footer() {
  return(
    <footer className={s.footer}>
      <b>ТРПУ-17</b>
      <p> Максим Воронин &copy; {new Date().getFullYear()}</p>
      <Link to="//catlense.ru" target="_blank">
        <img src={catlenseLogo} alt="Catlense Logo" />
      </Link>
    </footer>
  )
}