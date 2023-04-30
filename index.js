"use strict";
const { default: makeWASocket, BufferJSON, initInMemoryKeyStore, DisconnectReason, AnyMessageContent, makeInMemoryStore, useSingleFileAuthState, delay} = require("@adiwajshing/baileys")
const figlet = require("figlet");
const fs = require("fs");
const moment = require('moment')
const chalk = require('chalk')
const logg = require('pino')
const clui = require('clui')
const { Spinner } = clui
const { serialize } = require("./db/function/myfunc");
const { color, mylog, infolog } = require("./db/function/color");
const time = moment(new Date()).format('HH:mm:ss DD/MM/YYYY')
let setting = JSON.parse(fs.readFileSync('./admin/config.json'));
let session = `./${setting.sessionName}.json`
const { state, saveState } = useSingleFileAuthState(session)
let welcome = JSON.parse(fs.readFileSync('./db/data/welcome.json'));
function title() {
console.clear()
console.log(figlet.textSync('GAME', {
font: 'Ghost',
lhorizontalLayout: 'default',
verticalLayout: 'default',
width: 80,
whitespaceBreak: true
}));
console.log(chalk.yellow("GAME BOT BY RIMURUBOTZ"))
}

function nocache(module, cb = () => { }) {
fs.watchFile(require.resolve(module), async () => {
await uncache(require.resolve(module))
cb(module)})}
function uncache(module = '.') {
return new Promise((resolve, reject) => {
try {
delete require.cache[require.resolve(module)]
resolve()
} catch (e) {
reject(e)
}})} 
const store = makeInMemoryStore({ logger: logg().child({ level: 'fatal', stream: 'GAME' }) })
const connectToWhatsApp = async () => {
const nayla = makeWASocket({
printQRInTerminal: true,
logger: logg({ level: 'fatal' }),
auth: state,
browser: ["GAME", "NEW", "3.0"]
})
title()
store.bind(nayla.ev)
require('./admin/help')
require('./db/function/myfunc')
require('./nayla')
nocache('./admin/help', module => console.log("UPDATE"))
nocache('./db/function/myfunc', module => console.log("UPDATE"))
nocache('./nayla', module => console.log("UPDATE"))

nayla.ev.on('messages.upsert', async m => {
if (!m.messages) return;
var nay = m.messages[0]
nay = serialize(nayla, nay)
nay.isBaileys = nay.key.id.startsWith('BAE5') || nay.key.id.startsWith('3EB0')
require('./nayla')(nayla, nay, m, setting, store, welcome)
})
nayla.ev.on('connection.update', (update) => {
const { connection, lastDisconnect } = update
if (connection === 'close') {
console.log(mylog('SUKSES'))
lastDisconnect.error?.output?.statusCode !== DisconnectReason.loggedOut 
? connectToWhatsApp()
: console.log(mylog('WA WEB KELUAR?'))
}})
nayla.ev.on('creds.update', () => saveState)
nayla.ev.on('group-participants.update', async (data) => {
const isWelcome = welcome.includes(data.id) ? true : false
if (isWelcome) {
try {
for (let i of data.participants) {
try {
var pp_user = await nayla.profilePictureUrl(i, 'image')
} catch {
var pp_user = 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg'
}
if (data.action == "add") {
nayla.sendMessage(data.id, { image: { url: pp_user }, caption: `Halo @${i.split("@")[0]} Selamat datang`, mentions: [i] })
} else if (data.action == "remove") {
nayla.sendMessage(data.id, { image: { url: pp_user }, caption: `Byeee @${i.split("@")[0]}`, mentions: [i] })
}
}
} catch (e) {
console.log(e)
}}})
nayla.reply = (from, content, nay) => nayla.sendMessage(from, { text: content }, { quoted: nay })
return nayla
}
connectToWhatsApp()
.catch(err => console.log(err))
