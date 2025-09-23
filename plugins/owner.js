const { cmd } = require('../command');
const config = require('../config');

cmd({
    pattern: "owner",
    react: "✅", 
    desc: "Get owner number",
    category: "main",
    filename: __filename
}, 
async (conn, mek, m, { from }) => {
    try {
        const ownerNumber = config.OWNER_NUMBER; // Fetch owner number from config
        const ownerName = config.OWNER_NAME;     // Fetch owner name from config

        const vcard = 'BEGIN:VCARD\n' +
                      'VERSION:3.0\n' +
                      `FN:${ownerName}\n` +  
                      `TEL;type=CELL;type=VOICE;waid=${ownerNumber.replace('+', '')}:${ownerNumber}\n` + 
                      'END:VCARD';

        // Send the vCard
        const sentVCard = await conn.sendMessage(from, {
            contacts: {
                displayName: ownerName,
                contacts: [{ vcard }]
            }
        });

        // Send the owner contact message with image and audio
        await conn.sendMessage(from, {
            image: { url: 'https://files.catbox.moe/9gnp53.jpeg' }, // Image URL from your request
            caption: `*🍓🍟  හායි ${pushname} කොහමද ඔයාට😝♦*
*╭-----------------------------------------------®
*┃🤖 ʙᴏᴛ ɴᴀᴍᴇ : 𝐒𝐎𝐋𝐎-𝐋𝐄𝐕𝐄𝐋𝐈𝐍𝐆-𝐌𝐃*
*┃🔖 ᴠᴇʀsɪᴏɴ : 1.0*
*┃📟 ᴘʟᴀᴛғᴏʀᴍ : Linux*
*┃👨‍💻 ᴏᴡɴᴇʀ: ꜱᴏʟᴏ ʟᴇᴠᴇʟɪɴɢ ʀᴜᴋꜱʜᴀɴ*
*┗━━━━━━━━━━━━━━𖣔𖣔*


╭━━〔 *SOLO-LEVELING-MD* 〕━━┈⊷
┃◈╭─────────────·๏
┃◈┃• *Here is the owner details*
┃◈┃• *Name* - ${ownerName}
┃◈┃• *Number* ${ownerNumber}
┃◈┃• *Version*: 2.0.0 Beta
┃◈└───────────┈⊷
╰──────────────┈⊷
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
