"use strict";
const {
downloadContentFromMessage
} = require("@adiwajshing/baileys")
const { color, bgcolor } = require('./db/function/color')
const { getBuffer, fetchJson, fetchText, getRandom, getGroupAdmins, runtime, sleep, makeid } = require("./db/function/myfunc");
const fs = require ("fs");
const moment = require("moment-timezone");
const { exec, spawn } = require("child_process");
const ffmpeg = require("fluent-ffmpeg");
const setting = JSON.parse(fs.readFileSync('./admin/config.json'));
const linkkarakter = JSON.parse(fs.readFileSync('./db/data/karakter.json'));
const { homeKarakter, boxerbot, silatbot, petirbot, plantbot, candybot, bansosbot, boxerbotSticker, silatbotSticker, petirbotSticker, plantbotSticker, candybotSticker, bansosbotSticker} = linkkarakter
const speed = require("performance-now");
const game = JSON.parse(fs.readFileSync('./db/data/game.json'))

let antilink = JSON.parse(fs.readFileSync('./db/data/antilink.json'));
const Exif = require("./db/function/exif")
const exif = new Exif()
moment.tz.setDefault("Asia/Jakarta").locale("id");
module.exports = async(nayla, nay, m, setting, store, welcome) => {
try {
let { ownerNumber, botName, donas, namaowner} = setting
let { allmenu } = require('./admin/help')
let user = JSON.parse(fs.readFileSync('./db/data/user.json'));
const { type, quotednay, mentioned, now, fromMe } = nay
if (nay.isBaileys) return
const jam = moment.tz('asia/jakarta').format('HH:mm:ss')
let dt = moment(Date.now()).tz('Asia/Jakarta').locale('id').format('a')
const ucapanWaktu = "Selamat "+dt.charAt(0).toUpperCase() + dt.slice(1)
const content = JSON.stringify(nay.message)
const from = nay.key.remoteJid
const chats = (type === 'conversation' && nay.message.conversation) ? nay.message.conversation : (type === 'imageMessage') && nay.message.imageMessage.caption ? nay.message.imageMessage.caption : (type === 'videoMessage') && nay.message.videoMessage.caption ? nay.message.videoMessage.caption : (type === 'extendedTextMessage') && nay.message.extendedTextMessage.text ? nay.message.extendedTextMessage.text : (type === 'buttonsResponseMessage') && quotednay.fromMe && nay.message.buttonsResponseMessage.selectedButtonId ? nay.message.buttonsResponseMessage.selectedButtonId : (type === 'templateButtonReplyMessage') && quotednay.fromMe && nay.message.templateButtonReplyMessage.selectedId ? nay.message.templateButtonReplyMessage.selectedId : (type === 'messageContextInfo') ? (nay.message.buttonsResponseMessage?.selectedButtonId || nay.message.listResponseMessage?.singleSelectReply.selectedRowId) : (type == 'listResponseMessage') && quotednay.fromMe && nay.message.listResponseMessage.singleSelectReply.selectedRowId ? nay.message.listResponseMessage.singleSelectReply.selectedRowId : ""
const toJSON = j => JSON.stringify(j, null,'\t')
const prefix = /^[°•π÷×¶∆£¢€¥®™✓_=|~!?#$%^&.+-,\/\\©^]/.test(chats) ? chats.match(/^[°•π÷×¶∆£¢€¥®™✓_=|~!?#$%^&.+-,\/\\©^]/gi) : '#'
const args = chats.split(' ')
const command = chats.toLowerCase().split(' ')[0] || ''
const isCmd = command.startsWith(prefix)
const isGroup = nay.key.remoteJid.endsWith('@g.us')
const sender = isGroup ? (nay.key.participant ? nay.key.participant : nay.participant) : nay.key.remoteJid
const isOwner = ownerNumber == sender ? true : ["0@s.whatsapp.net"].includes(sender) ? true : false
const pushname = nay.pushName
const q = chats.slice(command.length + 1, chats.length)
const body = chats.startsWith(prefix) ? chats : ''
const budy = (type === 'conversation') ? nay.message.conversation : (type === 'extendedTextMessage') ? nay.message.extendedTextMessage.text : ''
const botNumber = nayla.user.id.split(':')[0] + '@s.whatsapp.net'
const groupMetadata = isGroup ? await nayla.groupMetadata(from) : ''
const groupName = isGroup ? groupMetadata.subject : ''
const groupId = isGroup ? groupMetadata.id : ''
const groupMembers = isGroup ? groupMetadata.participants : ''
const groupAdmins = isGroup ? getGroupAdmins(groupMembers) : ''
const isBotGroupAdmins = groupAdmins.includes(botNumber) || false
const isGroupAdmins = groupAdmins.includes(sender)
const isWelcome = isGroup ? welcome.includes(from) ? true : false : false
const isAntilink = isGroup ? antilink.includes(from) ? true : false : false

const isUrl = (url) => {return url.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/, 'gi'))}
function jsonformat(string) {return JSON.stringify(string, null, 2)}
function mentions(teks, mems = [], id) {
if (id == null || id == undefined || id == false) {
let res = nayla.sendMessage(from, { text: teks, mentions: mems })
return res } else { let res = nayla.sendMessage(from, { text: teks, mentions: mems }, { quoted: nay })
return res}}
 
const reply = (teks) => {nayla.sendMessage(from, { text: teks }, { quoted: nay })}
const textImg = (teks) => {return nayla.sendMessage(from, { text: teks, jpegThumbnail: fs.readFileSync(setting.pathimg) }, { quoted: nay })}
const sendMess = (hehe, teks) => {nayla.sendMessage(hehe, { text, teks })}
const sendContact = (jid, numbers, name, quoted, mn) => {
let number = numbers.replace(/[^0-9]/g, '')
const vcard = 'BEGIN:VCARD\n' 
+ 'VERSION:3.0\n' 
+ 'FN:' + name + '\n'
+ 'ORG:;\n'
+ 'TEL;type=CELL;type=VOICE;waid=' + number + ':+' + number + '\n'
+ 'END:VCARD'
return nayla.sendMessage(from, { contacts: { displayName: name, contacts: [{ vcard }] }, mentions : mn ? mn : []},{ quoted: quoted })
}
const isImage = (type == 'imageMessage')
const isVideo = (type == 'videoMessage')
const isSticker = (type == 'stickerMessage')
const isQuotedMsg = (type == 'extendedTextMessage')
const isQuotedImage = isQuotedMsg ? content.includes('imageMessage') ? true : false : false
const isQuotedAudio = isQuotedMsg ? content.includes('audioMessage') ? true : false : false
const isQuotedDocument = isQuotedMsg ? content.includes('documentMessage') ? true : false : false
const isQuotedVideo = isQuotedMsg ? content.includes('videoMessage') ? true : false : false
const isQuotedSticker = isQuotedMsg ? content.includes('stickerMessage') ? true : false : false 
if (!isGroup && isCmd && !fromMe) {console.log('->[\x1b[1;32mCMD\x1b[1;37m]', color(moment(nay.messageTimestamp * 1000).format('DD/MM/YYYY HH:mm:ss'), 'yellow'), color(`${command} [${args.length}]`), 'from', color(pushname))}
if (isGroup && isCmd && !fromMe) {console.log('->[\x1b[1;32mCMD\x1b[1;37m]', color(moment(nay.messageTimestamp *1000).format('DD/MM/YYYY HH:mm:ss'), 'yellow'), color(`${command} [${args.length}]`), 'from', color(pushname), 'in', color(groupName))} 
 	
switch(command) { 
 

case prefix+'menu':
case prefix+'help':
nayla.sendMessage(from, {image:{url:"./bot.jpg"}, caption:allmenu(prefix, namaowner)}, {quoted:nay})

break

case prefix+'sticker': case prefix+'stiker': case prefix+'s':
var namaPack = q.split('|')[0] ? q.split('|')[0] : q
var authorPack = q.split('|')[1] ? q.split('|')[1] : ''
if (namaPack && authorPack) {
exif.create(namaPack, authorPack)
} else { exif.create("s.id/nomorbotstikerwhatsapp","Foto to Stiker") } 
if (isImage || isQuotedImage) {
var stream = await downloadContentFromMessage(nay.message.imageMessage || nay.message.extendedTextMessage?.contextInfo.quotedMessage.imageMessage, 'image')
var buffer = Buffer.from([])
for await(const chunk of stream) {
buffer = Buffer.concat([buffer, chunk])
}
var rand1 = 'sticker/'+getRandom('.jpg')
var rand2 = 'sticker/'+getRandom('.webp')
fs.writeFileSync(`./${rand1}`, buffer)
ffmpeg(`./${rand1}`)
.on("error", console.error)
.on("end", () => {
exec(`webpmux -set exif ./sticker/data.exif ./${rand2} -o ./${rand2}`, async (error) => {
nayla.sendMessage(from, { sticker: fs.readFileSync(`./${rand2}`) }, { quoted: nay })
fs.unlinkSync(`./${rand1}`)
fs.unlinkSync(`./${rand2}`)
reply("Sebagai tanda terima kasih\n *Bantu Subscribe Channel*\nhttps://www.youtube.com/channel/UCGr6-nskQkBo_bmB2ykmfVw")
})
})
.addOutputOptions(["-vcodec", "libwebp", "-vf", "scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse"])
.toFormat('webp')
.save(`${rand2}`)
} else if (isVideo || isQuotedVideo) {
var stream = await downloadContentFromMessage(nay.message.imageMessage || nay.message.extendedTextMessage?.contextInfo.quotedMessage.videoMessage, 'video')
var buffer = Buffer.from([])
for await(const chunk of stream) {
buffer = Buffer.concat([buffer, chunk])
}
var rand1 = 'sticker/'+getRandom('.mp4')
var rand2 = 'sticker/'+getRandom('.webp')
fs.writeFileSync(`./${rand1}`, buffer)
ffmpeg(`./${rand1}`)
.on("error", console.error)
.on("end", () => {
exec(`webpmux -set exif ./sticker/data.exif ./${rand2} -o ./${rand2}`, async (error) => {
nayla.sendMessage(from, { sticker: fs.readFileSync(`./${rand2}`) }, { quoted: nay })
fs.unlinkSync(`./${rand1}`)
fs.unlinkSync(`./${rand2}`)
reply("*Bantu Support Subscribe Channel*\nhttps://www.youtube.com/channel/UCGr6-nskQkBo_bmB2ykmfVw")
})
})
.addOutputOptions(["-vcodec", "libwebp", "-vf", "scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse"])
.toFormat('webp')
.save(`${rand2}`)
} else {
reply(`Kirim gambar dengan caption *.stiker*  *.sticker*  atau balas gambar yang sudah dikirim`)
}
break 

default:
			
}
} catch (err) {
console.log(color('[ERROR]', 'red'), err)
}
}
