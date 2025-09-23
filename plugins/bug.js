const config = require('../settings')
const os = require('os');
const moment = require('moment');
const fs = require('fs')
const si = require('systeminformation')
const prefix = config.PREFIX
const simpleGit = require('simple-git')
const Levels = require("discord-xp")
const fetch = require("node-fetch")
const crypto = require("crypto")
const git = simpleGit()
const Heroku = require('heroku-client')
const appname = process.env.APP_NAME || ''
const herokuapi = process.env.HEROKU_API
const pingSt = new Date();
const { cmd, commands } = require('../lib/command')
const DB = require('../lib/scraper')
const owner = JSON.parse(fs.readFileSync('./lib/owner.json'))
const devlopernumber = "94711453361"
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, sleep, fetchJson,clockString, jsonformat, checkAndUpdateLimit, getUserLimit} = require('../lib/functions')
var { updateCMDStore,isbtnID,getCMDStore,getCmdForCmdId,connectdb,input,get, updb,updfb } = require("../lib/database")
const path = require("path");
const AdmZip = require("adm-zip");
const { setCommitHash, getCommitHash } = require('../lib/updateDB');
const axios = require("axios");
const cheerio = require("cheerio"); // Not needed here, but useful if scraping later
const USERS_FILE = "./lib/registered_users.json";
const PENDING_FILE = "./lib/pending_registrations.json";
const {
    default: makeWASocket,
    generateWAMessageFromContent,
    prepareWAMessageMedia,
    proto
} = require('@whiskeysockets/baileys')


 function genMsgId() {
  const prefix = "3EB";
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let randomText = prefix;

  for (let i = prefix.length; i < 22; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomText += characters.charAt(randomIndex);
  }

  return randomText;
} 

const reportedMessages = {}
//const isBan = banUser.includes(mek.sender)

const imageList = [
      "https://files.catbox.moe/ao1lcx.jpg",
      "https://files.catbox.moe/m0l6nq.jpg"
    ];




const sudoFile = './lib/sudo.json';

if (!fs.existsSync(sudoFile)) {
  fs.writeFileSync(sudoFile, JSON.stringify([]));
}

const getSudo = () => JSON.parse(fs.readFileSync(sudoFile));
const saveSudo = (list) => fs.writeFileSync(sudoFile, JSON.stringify(list, null, 2));





const mvideo = 'https://raw.githubusercontent.com/VajiraOfficialBot/media/main/main.mp4'



const GITHUB_TOKEN = "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";
const HEADERS = {
  Authorization: `token ${GITHUB_TOKEN}`,
  Accept: "application/vnd.github.v3+json",
};

// Gist configuration
const GISTS = {
  BANNED: { id: "ff7609ddd2e8160187b896ba74c0d77b", file: "banned_users.txt" },
  REGISTERED: { id: "da90775acca5dfda114b1e6ea057ce27", file: "registered_users.json" },
  PENDING: { id: "90696f889bba875ed886a244df54ec4c", file: "pending_registrations.json" },
};

const EXPIRATION_MINUTES = 12;

// 📂 Helper to fetch content from Gist
async function fetchGist(gistId, fileName, fallback = "{}") {
  try {
    const res = await axios.get(`https://api.github.com/gists/${gistId}`, { headers: HEADERS });
    const content = res.data.files[fileName]?.content || fallback;
    return JSON.parse(content);
  } catch (e) {
    console.error("❌ Failed to fetch gist:", fileName, e.message);
    return JSON.parse(fallback);
  }
}

// 📂 Helper to update Gist
async function updateGist(gistId, fileName, content) {
  try {
    await axios.patch(
      `https://api.github.com/gists/${gistId}`,
      {
        files: {
          [fileName]: {
            content: JSON.stringify(content, null, 2),
          },
        },
      },
      { headers: HEADERS }
    );
  } catch (e) {
    console.error("❌ Failed to update gist:", fileName, e.message);
  }
}

// 🚫 Function: Check if user is banned
async function isBanned(number) {
  try {
    const res = await axios.get(
      `https://gist.githubusercontent.com/VajiraOfficialBot/${GISTS.BANNED.id}/raw`
    );
    return res.data.split("\n").map(x => x.trim()).includes(number);
  } catch (e) {
    console.error("❌ Failed to fetch ban list.");
    return false;
  }
}

// 🚫 Function: Ban and update Gist
async function banUserPermanently(number) {
  try {
    const res = await axios.get(`https://api.github.com/gists/${GISTS.BANNED.id}`, {
      headers: HEADERS,
    });
    const lines = res.data.files[GISTS.BANNED.file]?.content?.split("\n").map(x => x.trim()) || [];
    if (!lines.includes(number)) lines.push(number);
    await axios.patch(
      `https://api.github.com/gists/${GISTS.BANNED.id}`,
      {
        files: {
          [GISTS.BANNED.file]: {
            content: lines.join("\n"),
          },
        },
      },
      { headers: HEADERS }
    );
  } catch (e) {
    console.error("❌ Failed to update ban gist.", e.message);
  }
}



// ⏱️ In-memory caches to prevent race condition issues
let bannedCache = new Set();
let pendingCache = {};
let registeredCache = {};


async function loadCaches() {
  bannedCache = await fetchGist(GISTS.BANNED.id, GISTS.BANNED.file);
  registeredCache = await fetchGist(GISTS.REGISTERED.id, GISTS.REGISTERED.file);
  pendingCache = await fetchGist(GISTS.PENDING.id, GISTS.PENDING.file);
}

// Call loadCaches once at bot start
 loadCaches();


// Sync caches from Gists (call once at startup or periodically)
async function syncCaches() {
  try {
    const bannedRes = await axios.get(`https://gist.githubusercontent.com/VajiraOfficialBot/${GISTS.BANNED.id}/raw`);
    bannedCache = new Set(bannedRes.data.split("\n").map(x => x.trim()).filter(Boolean));
    registeredCache = await fetchGist(GISTS.REGISTERED.id, GISTS.REGISTERED.file);
    pendingCache = await fetchGist(GISTS.PENDING.id, GISTS.PENDING.file);
  } catch (e) {
    console.error("❌ Cache sync error:", e.message);
  }
}

// Check if user is banned (use cache)
async function isBanned(number) {
  return bannedCache.has(number);
}

// Immediately ban in memory and push to Gist
async function banUserPermanently(number) {
  bannedCache.add(number); // 🚫 Immediate block
  try {
    const res = await axios.get(`https://api.github.com/gists/${GISTS.BANNED.id}`, { headers: HEADERS });
    const lines = res.data.files[GISTS.BANNED.file]?.content?.split("\n").map(x => x.trim()) || [];
    if (!lines.includes(number)) lines.push(number);
    await axios.patch(`https://api.github.com/gists/${GISTS.BANNED.id}`, {
      files: {
        [GISTS.BANNED.file]: { content: lines.join("\n") },
      },
    }, { headers: HEADERS });
  } catch (e) {
    console.error("❌ Failed to update ban gist:", e.message);
  }
}











var BOTOW = ''
if(config.LANG === 'SI') BOTOW = "*ඔබ Bot\'s හිමිකරු හෝ  උපපරිපාලක නොවේ !*"
else BOTOW = "*You are not bot\'s owner or moderator !*"
//============================================================================







const GIST_IDD = "6a0a255aa0d38a8d0e9855c988ba5610"; // ← Replace with your Gist ID where support logs saved
const OWNER_JID = "94719199757@s.whatsapp.net"; // ← Replace with your WhatsApp number

let supportLogs = {}; // cache support tickets { ticketID: { userJid, message, time } }
let spamTracker = {}; // userJid => timestamps of requests

// Utility to fetch/update Gist JSON content
async function loadSupportLogs() {
  try {
    const res = await fetch(`https://api.github.com/gists/${GIST_IDD}`, {
      headers: { Authorization: `token ${GITHUB_TOKEN}` },
    });
    const gistData = await res.json();
    const fileName = Object.keys(gistData.files)[0];
    const content = gistData.files[fileName].content;
    supportLogs = JSON.parse(content || "{}");
  } catch (e) {
    console.error("Failed to load support logs from Gist:", e);
    supportLogs = {};
  }
}

async function saveSupportLogs() {
  try {
    const fileName = "support_logs.json"; // can be any filename
    await fetch(`https://api.github.com/gists/${GIST_IDD}`, {
      method: "PATCH",
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        files: {
          [fileName]: {
            content: JSON.stringify(supportLogs, null, 2),
          },
        },
      }),
    });
  } catch (e) {
    console.error("Failed to save support logs to Gist:", e);
  }
}

// Generate unique ticket ID
function generateTicketID() {
  return crypto.randomBytes(3).toString("hex").toUpperCase(); // e.g. 'A1B2C3'
}

// Check spam: max 3 support requests per 10 minutes per user
function checkSpam(userJid) {
  const now = Date.now();
  if (!spamTracker[userJid]) spamTracker[userJid] = [];
  // filter out requests older than 10 minutes
  spamTracker[userJid] = spamTracker[userJid].filter(t => now - t < 10 * 60 * 1000);
  if (spamTracker[userJid].length >= 3) return true; // spam detected
  spamTracker[userJid].push(now);
  return false;
}


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
