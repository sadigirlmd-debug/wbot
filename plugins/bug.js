const { cmd } = require("../command");
const config = require("../config");

cmd({
  pattern: "channelreact",
  alias: ["chr"],
  react: "📕",
  use: ".channelreact <channel link>,<emoji>",
  desc: "React to a channel message",
  category: "main",
  filename: __filename,
},
async (conn, mek, m, { q, reply }) => {
  try {
    // ---------------- Language messages ----------------
    let usageMsg, invalidInput, invalidFormat, successMsg, errorMsg;
    
    if (config.LANG === 'si') {
      usageMsg = "*භාවිතය:* .channelreact <link>,<reaction>";
      invalidInput = "*අවලංගු ආදානයක්.* කරුණාකර සබැඳිය හා විකාශය දෙකම ලබාදෙන්න.";
      invalidFormat = "*අවලංගු නාලිකා සබැඳි ආකෘතියක්.*";
      successMsg = (reaction) => `✅ "${reaction}" ලෙස ප්‍රතික්‍රියාවක් යවා ඇත.`;
      errorMsg = (msg) => `❌ දෝෂයක්: ${msg}`;
    } else {
      usageMsg = "*Usage:* .channelreact <channel link>,<emoji>";
      invalidInput = "*Invalid input.* Please provide both the link and the emoji.";
      invalidFormat = "*Invalid channel link format.*";
      successMsg = (reaction) => `✅ Reacted with "${reaction}" to the message.`;
      errorMsg = (msg) => `❌ Error: ${msg}`;
    }

    // ---------------- Validate input ----------------
    if (!q || !q.includes(',')) return reply(usageMsg);

    const [link, reaction] = q.split(',').map(v => v.trim());
    if (!link || !reaction) return reply(invalidInput);

    // ---------------- Extract channelId + messageId ----------------
    let channelId, messageId;
    try {
      const url = new URL(link);
      const parts = url.pathname.split("/").filter(Boolean);

      // Expected: /channel/<channelId>/<messageId>
      if (parts[0] === "channel" && parts.length >= 3) {
        channelId = parts[1];
        messageId = parts[2];
      }
    } catch {
      return reply(invalidFormat);
    }

    if (!channelId || !messageId) return reply(invalidFormat);

    // ---------------- Make sure channel exists ----------------
    await conn.newsletterMetadata(channelId);

    // ---------------- Send reaction ----------------
    await conn.newsletterReactMessage(channelId, messageId, reaction);

    reply(successMsg(reaction));
  } catch (e) {
    console.error(e);
    reply(errorMsg(e.message));
  }
});