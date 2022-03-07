import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import './index.css'
import Main from "./pages/Main/Main";
import axios from 'axios'
import config from './config'
import { useDispatch } from "react-redux";
import Join from "./pages/Join/Join";
import Register from "./pages/Register/Register";

function App() {

  const dispatch = useDispatch()

  if(localStorage.token) {
    axios.get(`${config.api}/user/get?token=${localStorage.token}`).then(({data}) => {
      dispatch({type: "JOIN_USER", payload: data})
    })
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" index element={<Main title="Главная страница" />} />
        <Route path="/join" element={<Join title="Авторизация" />} />
        <Route path="/register" element={<Register title="Регистрация" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
