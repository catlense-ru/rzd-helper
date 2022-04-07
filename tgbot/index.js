import Telebot from "telebot";
import config from './config.js'
import axios from "axios";

const bot = new Telebot(config.token)

bot.start()

function getSystems(msg) {
  axios.get(`${config.api}/control/systems/getAll`).then(({data}) => {
    const array = []
    data.forEach(e => {
      array.push([bot.inlineButton(e.name, {callback: `system///${e.uid}`})])
    })
    let replyMarkup = bot.inlineKeyboard(array, {resize: true});
    return bot.sendMessage(msg.from.id, `Выберите систему из списка ниже`, {replyMarkup})
  })
}