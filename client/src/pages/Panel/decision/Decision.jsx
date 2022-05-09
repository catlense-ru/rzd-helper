import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../../../components/footer/Footer";
import Header from "../../../components/header/Header";
import config from "../../../config";
import s from './decision.module.scss'

export default function Decision(props) {

  const navigate = useNavigate()
  const user = useSelector(state => state.user)
  if(!user.login || user.permissions < 1) { navigate('/') }

  const [systems, setSystems] = useState();
  const [system, setSystem] = useState(0);

  const [comments, setComments] = useState();
  const [comment, setComment] = useState(0);

  const [decision, setDecision] = useState('')
  const [selectedFile, setSelectedFile] = useState(null)
  const [result, setResult] = useState('')
  const [pathToImage, setPathToImage] = useState()

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    axios.get(`${config.api}/control/systems/getAll`).then(({ data }) => {
      setSystems(data)
    })
  }, [])

  useEffect(() => {
    console.log(system)
    if (system !== 0) {
      axios.get(`${config.api}/control/comments/getBySystem?id=${system}`).then(({ data }) => {
        setComments(data)
      })
    }
  }, [system])

  useEffect(() => {
    console.log(selectedFile)

    async function fetchData() {
      const formData = new FormData()
      formData.append('photo', selectedFile)
      await axios.post(`${config.api}/upload`, formData, {
        headers: {
          'content-type': 'multipart/form-data'
        }
      }).then(({data}) => {
        console.log(data)
        setPathToImage(data.response)
        setResult('Файл загружен')
        setLoading(false)
      })
    }

    if(selectedFile) {
      setLoading(true)
      fetchData()
    }
  }, [selectedFile])

  const sendData = () => {
    if(!decision || decision.trim() === '') return setResult('Укажите решение')
    axios.post(`${config.api}/control/decisions/create`, {
      comment_id: comment,
      decision: decision,
      by: user.uid,
      by_name: `${user.name} ${user.surname}`,
      photo: pathToImage
    }).then(({ data }) => {
      setResult(data.message)
      setDecision('')
      setPathToImage('')
    })
  }

  return (
    <>
      <title>{props.title}</title>

      <Header />
      <div className={s.decisionContainer}>
        <h1>Добавление решения</h1>
        <p>Выберите систему</p>
        <select value={system} onChange={({ target }) => setSystem(target.value)}>
          <option value="0">Выберите систему</option>
          {
            systems ? systems.map(e => <option value={e.uid} key={e.uid}>{e.name}</option>) : null
          }
        </select>

        <p>Выберите замечание</p>
        <select name="" id="" onChange={({ target }) => setComment(target.value)} value={comment}>
          <option value="0">Выберите из списка</option>
          {
            comments ? comments.map(e => <option value={e.uid} key={e.uid}>{e.comment}</option>) : null
          }
        </select>
        <Link to="/panel/comment">Добавить замечание</Link>

        <p>Ваше решение</p>
        <textarea placeholder="Напишите одно решение, после сохранения пишите второе и т.д." onChange={({ target }) => setDecision(target.value)} value={decision}></textarea>
        <label htmlFor="file">Загрузить фото</label>
        <input type="file" id="file" accept="image/*" style={{display: 'none'}} onChange={({target}) => setSelectedFile(target.files[0])} />
        <button onClick={sendData}>Сохранить</button>
        <p>{result}</p>
        <p>{loading && 'Загрузка...'}</p>
        {
          pathToImage && <img src={`${config.api}/${pathToImage}`} alt={pathToImage} />
        }
      </div>
      <Footer />
    </>
  )
}