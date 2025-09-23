const config = require('../config')
const { cmd, commands } = require('../command')
const { fetchJson } = require('../lib/functions')

cmd({
    pattern: "botai1",
    alias: ["laki6"],
    react: "📑",
    desc: "AI chat.",
    category: "main",
    filename: __filename
},
async (conn, mek, m, {
    from, quoted, body, isCmd, command, args, q,
    isGroup, sender, senderNumber, botNumber2, botNumber,
    pushname, isMe, isOwner, groupMetadata, groupName,
    participants, groupAdmins, isBotAdmins, isAdmins, reply
}) => {
    try {
        // ---- check if user gave input ----
        if (!q || q.trim() === "") {
            return reply("❌ කරුණාකර message එකක් type කරන්න!\nඋදාහරණය: .botai hello")
        }

        // ---- special response for 'who made this' ----
        const lowerQ = q.toLowerCase()
        if (lowerQ.includes("කවුද හැදුවේ") || lowerQ.includes("who made this")) {
            return reply("👑 QUEEN DINU MD OWNER IS FOUNDER")
        }

        // ---- fetch AI response ----
        const url = `https://dark-shan-yt.koyeb.app/ai/gemini?q=${encodeURIComponent(q)}`
        const data = await fetchJson(url)

        if (!data || !data.data) {
            return reply("😬 මචං, API එකෙන් response එකක් ආවෙ නැහැ. Koyeb link එක check කරලා බලන්න.")
        }

        return reply(`${data.data}\n\n> ㋛︎ ᴘᴏᴡᴇʀᴅ ʙʏ ᴍʀ 𝐂𝐘𝐁𝐄𝐑 𝐃𝐈𝐍𝐔 𝐈𝐃 ᶜᵒᵈᵉʳ`)
    } catch (e) {
        console.error(e)
        reply(`අයියෝ බ්‍රෝ, error එකක්! 😂\n\n${e.message}`)
    }
})