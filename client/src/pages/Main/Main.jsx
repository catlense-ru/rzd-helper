import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import s from './main.module.scss'

export default function Main(props) {
  return(
    <>
      <title>{props.title}</title>
      <Header />
      <div className={s.wrapper}>
        <div className={s.selector}>
          <h1>Помощник поиска неисправностей</h1>
          <p>Система</p>
          <select name="" id="">
            <option value="">Выберите из списка</option>  
          </select>
          <p>Замечание</p>
          <select name="" id="">
            <option value="">Выберите из списка</option>  
          </select>
        </div>  
      </div>
      <Footer />
    </>
  )
}