const config = require('../config')
const {cmd , commands} = require('../command')
const os = require("os")
const {runtime} = require('../lib/functions')
cmd({
    pattern: "pair",
    alias: ["freebot","bot"],
    desc: "Check up time , ram usage and more",
    category: "main",
    react: "🖇️",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
let status = `╭━━〔 *🧙‍♂️ 𝐙𝐀𝐍𝐓𝐀 × 𝐌𝐃 𝐎𝐅𝐂 🧙‍♂️* 〕━━┈⊷
┃◈╭─────────────·๏
┃◈┃• *🖇️ session web* : https://zanta-pair-64b7a66ac79c.herokuapp.com/
┃◈┃• *🖇️ deploy web* :
┃◈┃• *👤 owner number* : 94760264995
┃◈┃• *👤 Owner* : ᴍʀ ꜱᴜʀᴀɴɢᴀ ᴍᴏᴅ-ᴢ🧸
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
 (e)
reply(`${e}`)

}
})