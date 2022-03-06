import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import './index.css'
import Main from "./pages/Main/Main";
import axios from 'axios'
import config from './config'
import { useDispatch, useSelector } from "react-redux";

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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
