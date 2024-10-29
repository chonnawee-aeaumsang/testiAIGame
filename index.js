const TelegramBot = require("node-telegram-bot-api");

const TOKEN = "8062611798:AAGblNZBc2xdpYfZXNXbhORXV5MJzQmdYVU"; // Replace with your bot token
const webhookUrl = "https://test-deployi-ai.vercel.app/api/webhook"; // This should match your deployed function URL

const bot = new TelegramBot(TOKEN, { polling: false });

bot.setWebHook(webhookUrl).then(() => {
    console.log("Webhook set successfully.");
}).catch(err => {
    console.error("Error setting webhook:", err);
});

