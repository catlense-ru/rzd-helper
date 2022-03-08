import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";

export default function Panel(props) {
  return(
    <>
      <title>{props.title}</title>
      <Header />
      
      <Footer /> 
    </>
  )
}