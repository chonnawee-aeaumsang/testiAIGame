const TelegramBot = require("node-telegram-bot-api");

const TOKEN = "7784233435:AAElh1jUghg5Nbuh22mprl1xPq8BvTYzTQg"; // Replace with your bot token
const webhookUrl = "https://testi-ai-game.vercel.app/api/webhook"; // This should match your deployed function URL

const bot = new TelegramBot(TOKEN, { polling: false });

bot.setWebHook(webhookUrl).then(() => {
    console.log("Webhook set successfully.");
}).catch(err => {
    console.error("Error setting webhook:", err);
});

