const { default: makeWASocket, useMultiFileAuthState, DisconnectReason, jidNormalizedUser, getContentType, fetchLatestBaileysVersion, generateWAMessageFromContent, prepareWAMessageMedia , downloadContentFromMessage,  generateWAMessageContent,proto, Browsers, jidDecode,  WAMessage, delay} = require('@whiskeysockets/baileys');

const config = require('../config');
const {cmd , commands} = require('../command');
const axios = require('axios');

cmd({
    pattern: "tiks",
    desc: "Search TikTok videos",
    use: "<query>",
    category: "search",
    react: "📱",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    let text = q;
    if (!text) return conn.sendMessage(from, { text: '[❗] What do you want to search on TikTok?' }, { quoted: mek });

    try {
    

        
        
        let response = await tiktokSearch(text);
        if (!response.status) throw new Error(response.result);
        let searchResults = response.result;
        shuffleArray(searchResults);
        let selectedResults = searchResults.slice(0, 7);
        let videoMessages = await Promise.all(selectedResults.map(result => createVideoMessage(result.videoUrl, conn)));
        let results = videoMessages.map((videoMessage, index) => ({
            body: proto.Message.InteractiveMessage.Body.fromObject({ text: '' }),
            footer: proto.Message.InteractiveMessage.Footer.fromObject({ text: `🧙‍♂️ 𝐙𝐀𝐍𝐓𝐀 × 𝐌𝐃 𝐎𝐅𝐂 🧙‍♂️* ` }),
            header: proto.Message.InteractiveMessage.Header.fromObject({
                title: selectedResults[index].description, hasMediaAttachment: true, videoMessage: videoMessage
            }),
            nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.fromObject({ buttons: [                            {
                        name: "quick_reply",
                        buttonParamsJson: JSON.stringify({
                            display_text: "Audio",
                            id: ".play lelena",
                        }),
                    },] })
        }));
        const responseMessage = generateWAMessageFromContent(from, {
            viewOnceMessage: {
                message: {
                    messageContextInfo: {
                        deviceListMetadata: {},
                        deviceListMetadataVersion: 2
                    },
                    interactiveMessage: proto.Message.InteractiveMessage.fromObject({
                        body: proto.Message.InteractiveMessage.Body.create({ text: `*🧙‍♂️ 𝐙𝐀𝐍𝐓𝐀 × 𝐌𝐃 𝐎𝐅𝐂 🧙‍♂️ ꜱᴇᴀʀᴄʜ**\n📌 *ꜱᴇᴀʀᴄʜᴇᴅ ᴛᴇxᴛ::* ${text}\n📈 *ʀᴇꜱᴜʟᴛꜱ ᴏʙᴛᴀɪɴᴇᴅ:*` }),
                        footer: proto.Message.InteractiveMessage.Footer.create({ text: '' }),
                        header: proto.Message.InteractiveMessage.Header.create({ hasMediaAttachment: false }),
                        carouselMessage: proto.Message.InteractiveMessage.CarouselMessage.fromObject({ cards: results })
                    })
                }
            }
        }, { quoted: mek });
        await conn.relayMessage(from, responseMessage.message, { messageId: responseMessage.key.id });
    } catch (error) {
        await conn.sendMessage(from, { text: error.toString() }, { quoted: mek });
    }
});

async function tiktokSearch(query) {
    try {
        const response = await axios.post("https://apis.davidcyriltech.my.id/download/ytmp4?url=$", new URLSearchParams({ keywords: query, count: '10', cursor: '0', HD: '1' }), {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
                Cookie: "current_language=en",
                "User-Agent": "Mozilla/5.0 (Linux Android 10 K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Mobile Safari/537.36",
            }
        });
        const videos = response.data.data.videos;
        if (videos.length === 0) return { status: false, result: "No videos found." };
        return {
            status: true,
            result: videos.map(v => ({
                description: v.title ? v?.title : "No description",
                videoUrl: v.play ? v.play : "No URL"
            }))
        };
    } catch (error) {
        return { status: false, result: error.message };
    }
}

async function createVideoMessage(url, conn) {
    try {
        const response = await axios.get(url, { responseType: 'arraybuffer' });
        const buffer = response.data;
        const { videoMessage } = await generateWAMessageContent({ video: buffer }, { upload: conn.waUploadToServer });
        return videoMessage;
    } catch (error) {
        throw new Error(`Error creating video message: ${error.message}`);
    }
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
          }