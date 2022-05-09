import Telebot from "telebot";
import config from './config.js'
import axios from "axios";

const bot = new Telebot(config.token)

bot.on(/^\/say (.+)$/, (msg, props) => {
  const text = props.match[1];
  return bot.sendMessage(msg.from.id, text, { replyToMessage: msg.message_id });
});

bot.on('edit', (msg) => {
  return msg.reply.text('I saw it! You edited message!', { asReply: true });
});

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