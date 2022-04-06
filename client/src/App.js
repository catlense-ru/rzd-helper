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
import Decision from "./pages/Panel/decision/Decision";
import Decisions from "./pages/Panel/decision/Decisions";
import Liked from "./pages/Panel/liked/Liked";
import Esystem from "./pages/Panel/Edit/Esystem";
import Ecomment from "./pages/Panel/Edit/Ecomment";
import Edecision from "./pages/Panel/Edit/Edecision";
import Stat from "./pages/Panel/stat/Stat";
import DDecision from "./pages/Panel/Delete/DDecision";
import Search from "./pages/Search/Search";

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
        <Route path="/panel/decision" element={<Decision title="Создание решения" />} />
        <Route path="/panel/decisions/:id" element={<Decisions title="Добавление решения" />} />
        <Route path="/panel/liked" element={<Liked title="Полезные решения" />} />

        <Route path="/panel/esystem" element={<Esystem title="Редактирование системы" />} />
        <Route path="/panel/ecomment" element={<Ecomment title="Редактирование замечания" />} />
        <Route path="/panel/edecision" element={<Edecision title="Редактирование решения" />} />

        <Route path="/panel/ddecision" element={<DDecision title="Деактивация решения" />} />

        <Route path="/panel/stat" element={<Stat title="Статистика сайта" />} />

        <Route path="/search" element={<Search title="Поиск по сайту" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
