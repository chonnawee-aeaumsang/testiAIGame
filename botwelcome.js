const TelegramBot = require("node-telegram-bot-api");

const TOKEN = "7784233435:AAElh1jUghg5Nbuh22mprl1xPq8BvTYzTQg"; // Replace with your actual bot token
const bot = new TelegramBot(TOKEN, { polling: true });

bot.on("message", async (msg) => {
    const chatId = msg.chat.id;
    const text = msg.text;
    const firstName = msg.from.first_name;

    // Check if the received message is the /start command
    if (text === "/start") {
        try {
            // Send welcome message
            await bot.sendMessage(chatId, `Welcome, ${firstName}! 🎉 We’re excited to have you here.`);
        } catch (error) {
            console.error("Error sending welcome message and image:", error);
        }
    }
});
