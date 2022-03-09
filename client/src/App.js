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
import Panel from "./pages/Panel/Panel";
import Users from "./pages/Panel/users/Users";
import Export from "./pages/Panel/export/Export";
import System from "./pages/Panel/system/System";
import Locomotive from "./pages/Panel/locomotive/Locomotive";
import Comment from "./pages/Panel/comment/Comment";

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
        <Route path="/panel" element={<Panel title="Управление" />} />

        <Route path="/panel/users" element={<Users title="Управление пользователями" />} />
        <Route path="/panel/export" element={<Export title="Экспорт таблицы" />} />
        <Route path="/panel/system" element={<System title="Создание системы" />} />
        <Route path="/panel/locomotive" element={<Locomotive title="Добавление серии локомотива" />} />
        <Route path="/panel/comment" element={<Comment title="Создание замечания"/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
