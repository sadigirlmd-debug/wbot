const config = require('../config')
const {cmd , commands} = require('../command')
cmd({
    pattern: "owner",
    alias: ["botingsk","dlflflfcxlslx"], 
    react: "☺️",
    desc: "get owner dec",
    category: "main",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
let about = `╭━---------------------------------------------
┃◈╭─────────────·๏
┃◈┃• *⛩️ 𝐎𝐰𝐧𝐞𝐫: ® 𝐂𝐘𝐁𝐄𝐑 𝐃𝐈𝐍𝐔 𝐈𝐃 ☺️*
┃◈└───────────┈⊷
╰──────────────┈
┏━❮ ⛩️ 𝐐𝐔𝐄𝐄𝐍 𝐃𝐈𝐍𝐔 𝐌𝐃 ⛩️ ❯━
┃◈┃🤖 ʙᴏᴛ ɴᴀᴍᴇ :QUEEN DINU MD
┃◈┃🔖 ᴠᴇʀsɪᴏɴ : 2.0
┃◈┃📟 ᴘʟᴀᴛғᴏʀᴍ : Linux
┃◈┃👨‍💻ᴏᴡɴᴇʀ: 𝐂𝐘𝐁𝐄𝐑 𝐃𝐈𝐍𝐔 𝐈𝐃 ⛩️
┃◈┗━━━━━━━━━━━━━━𖣔𖣔
╰──────────────┈⊷
⛩️ *MY OWNER ABOUT :-* *About Me Hi, I'm Dinu — a passionate individual with a dream to rise above limits and make my name a globally recognized brand. I have a basic knowledge of HTML and a deep interest in technology and design. I’m currently focused on learning Japanese and Korean, as I believe language is a key that opens doors to new opportunities.*

*My ultimate goal is not just to find success, but to create it — by building a powerful brand that will be known and respected worldwide. Every step I take is a move towards that vision — driven by hard work, dedication, and a desire to give my mother the life she deserves.*

*This is just the beginning of my journey. One day, the world will know the name Rukshan.*

⛩️ *_This WhatsApp bot is based on the Japanese anime series 𝐐𝐔𝐄𝐄𝐍 𝐃𝐈𝐍𝐔 𝐌𝐃, and I, or rather someone named 𝐂𝐘𝐁𝐄𝐑 𝐃𝐈𝐍𝐔 𝐈𝐃, created it this way.*_

*🐉 If you need any help from me, you can type the "alive" command and get the "menu" thanks*
*────────────────────────┈⊷*
⊷
*•────────────•⟢*
> © ᴘᴏᴡᴇʀᴇᴅ ʙʏ ꜱᴏʟᴏ ʟᴇᴠᴇʟɪɴɢ`, // Display the owner's details
            contextInfo: {
                mentionedJid: [`${ownerNumber.replace('+', '')}@s.whatsapp.net`], 
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363401755639074@newsletter',
                    newsletterName: '⛩️ ꜱᴏʟᴏ ʟᴇᴠᴇʟɪɴɢ ᴏᴡɴᴇʀ ⛩️',
                    serverMessageId: 143
                }            
            }
        }, { quoted: mek });

    // Send the audio file with context info
        await conn.sendMessage(from, {
            audio: { url: 'https://files.catbox.moe/ggebie.mp3' },
            mimetype: 'audio/mp4',
            ptt: true,
            contextInfo: { 
                mentionedJid: [m.sender],
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363401755639074@newsletter',
                    newsletterName: 'SOLO LEVELING MENU',
                    serverMessageId: 143
                }
            }
        }, { quoted: mek });

    } catch (error) {
        console.error(error);
        reply(`An error occurred: ${error.message}`);
    }
});
