const config = require('../config')
const {cmd , commands} = require('../command')
const os = require("os")
const {runtime} = require('../lib/functions')
cmd({
    pattern: "owner",
    alias: ["zanta","suranga"],
    desc: "Check up time , ram usage and more",
    category: "main",
    react: "👤",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
let status = `╭━━〔 *🧙‍♂️ 𝐙𝐀𝐍𝐓𝐀 × 𝐌𝐃 𝐎𝐅𝐂 🧙‍♂️* 〕━━┈⊷
┃◈╭─────────────·๏
┃◈┃• *👤 number :-* 94760264995
┃◈┃• *👨‍💻 Owner* : ᴍʀ ꜱᴜʀᴀɴɢᴀ ᴍᴏᴅ-ᴢ🧸
┃◈└───────────┈⊷
╰──────────────┈⊷
`
await conn.sendMessage(from, {
        video: {
            url: 'https://files.catbox.moe/xc42h2.mp4'
        },
        mimetype: 'video/mp4',
        ptv: true
    }, { quoted: mek });
    
return reply(`${status}`)
  
}catch(e){
console.log(e)
reply(`${e}`)

}
})