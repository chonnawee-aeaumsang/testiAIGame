const TelegramBot = require("node-telegram-bot-api");

const TOKEN = "7784233435:AAElh1jUghg5Nbuh22mprl1xPq8BvTYzTQg";
const gameName = "testiaigame"; // Replace with your game's short name
//const gameUrl = "https://testi-ai-game.vercel.app/"; // Your game URL

const gameUrl = `https://testi-ai-game.vercel.app/index.html?cache_bust=${Date.now()}`;

const imageUrl = "https://imgur.com/ZGgcA9c";// url images
const gameImageUrl = "https://imgur.com/a/iaigamelogo-cy4PJvU";

const botUsername = 'testiAIGame_bot';

const bot = new TelegramBot(TOKEN, { polling: false });

// const currentUserId = telegramUserId;
// const storedUserId = localStorage.getItem('user_id');
// if (storedUserId !== currentUserId) {
//     localStorage.clear();
//     localStorage.setItem('user_id', currentUserId);
// }

module.exports = async (req, res) => {
    if (req.method === 'POST') {
        const update = req.body;

        try {
            // Detect when the bot is added or the user's first interaction
            // if (update.my_chat_member) {
            //     const chatId = update.my_chat_member.chat.id;
            //     const firstName = update.my_chat_member.from.first_name;

            //     if (update.my_chat_member.new_chat_member.status === 'member') {
            //         // Send a welcome message when the user adds the bot for the first time
            //         await bot.sendMessage(chatId, `Welcome, ${firstName}! Let's play ${gameName}. You can type /game to start.`);
            //     }
            // }

            //Handle /help command to provide a tutorial
            //if (update.message && update.message.text === '/help') {
            //const chatId = update.message.from.id;

            // Use the URL to the image hosted on Vercel
            //const helpImageUrl = "https://i-ai-robot-build.vercel.app/images/Tutorial1_converted.jpg";  // Replace with your actual Vercel URL

            // Send the image with a caption
            //await bot.sendPhoto(chatId, helpImageUrl, {
            //caption: `*Here’s how to play ${gameName}:*\n\n*You can start the game by typing \\/game or \\/start\\.*`,
            //parse_mode: 'MarkdownV2'  // Using MarkdownV2 with correct escaping
            //});
            //}

             if (update.message && (update.message.text === '/help')){
                 const chatId = update.message.chat.id;
                 const option = {
                     reply_markup: {
                         keyboard: [
                             [{ text: '1' }],
                             [{ text: '2' }],
                             [{ text: '3' }],
                             [{ text: '4' }]
                         ],
                         resize_keyboard: true, // Adjusts the keyboard to the optimal size
                         one_time_keyboard: true // Hides the keyboard after a button is pressed
                 }
             };
             await bot.sendMessage(chatId, `What can i helps you? .`, option);
         }

            // Handle responses after clicking buttons
            bot.on('message', (message) => {
                const chatId = message.chat.id;

                if (message.text === '1') {
                    bot.sendMessage(chatId, 'ABC:...');
                } else if (message.text === '2') {
                    bot.sendMessage(chatId, 'DEF:...');
                } else if (message.text === '3') {
                    bot.sendMessage(chatId, 'GHI:...');
                } else if (message.text === '4') {
                    bot.sendMessage(chatId, 'JKL:...');
                }
            });

            // Handle /start or /game command
            if (update.message && (update.message.text === '/testgame')) {
                //const chatId = update.message.from.id; //DM
                const chatId = update.message.chat.id; //group respond
                const firstName = update.message.from.first_name;

                await bot.sendMessage(chatId, `Welcome, ${firstName}! Let's play ${gameName}.`);
                await bot.sendGame(chatId, gameName);
            }

            // Handle /start or /game command
            if (update.message && (update.message.text === '/playwithemail')) {
                //const chatId = update.message.from.id; //DM
                const chatId = update.message.chat.id; //group respond
                // const firstName = update.message.from.first_name;

                // await bot.sendMessage(chatId, `Welcome, ${firstName}! Let's play ${gameName}.`);
                // await bot.sendGame(chatId, gameName);

                // Send a message with a button to play the game, using a direct URL
                await bot.sendPhoto(chatId, gameImageUrl, {
                    caption: "Click below to play the game with email:",
                    reply_markup: {
                        inline_keyboard: [[{
                            text: "Play game with email",
                            url: gameUrl // Opens directly in Telegram’s in-app browser without permission prompts
                        }]]
                    }
                });
            }

            // Handle /start
            if (update.message && update.message.text === '/teststart') {
                const chatId = update.message.chat.id;
                const firstName = update.message.from.first_name;

                // Escape necessary characters for MarkdownV2
                const welcomeMessage = `🎮 *Welcome to the iAI Robot Game\\!* 🚀
A fun Telegram game where you collect iAI tokens, upgrade your strategy, and compete for rewards\\! 💰

*How to Play*  
🕹 *Swipe & Collect\\:* Start with 1,000 energy units\\. Each swipe earns you iAI coins\\!  
⚡️ *Upgrade Your Core\\:* Boost your energy for higher earnings\\.  
🏆 *Leaderboard\\:* Climb to the top for big rewards\\!  
🎯 *Daily Missions\\:* Complete tasks for bonus coins\\.

*Rewards*
💰 Earn tokens every play 
🎁 Complete quests for extra rewards  
🏆 *Top 10* leaderboard winners share a *$3,000 USDT Prize Pool\\!*

*Ready to play?* Hit "/testgame" and start earning\\! 🔥`;

                try {
                    // Send the welcome image with a caption
                    await bot.sendPhoto(chatId, imageUrl);
                    await bot.sendMessage(chatId, welcomeMessage, { parse_mode: 'MarkdownV2' });
                } catch (error) {
                    console.error("Error sending welcome message:", error);
                }

                //await bot.sendGame(update.message.from.id, gameName);
            }

            // Handle callback query for the Play button
            if (update.callback_query) {
                if (update.callback_query.game_short_name.toLowerCase() !== gameName.toLowerCase()) {
                    await bot.answerCallbackQuery(update.callback_query.id, `Sorry, '${update.callback_query.game_short_name}' is not available.`);
                } else {
                    const query_id = update.callback_query.id;
                    const firstName = update.callback_query.from.first_name;
                    const userID = update.callback_query.from.id;
                    await bot.answerCallbackQuery({ callback_query_id: query_id, url: gameUrl + `?query_id=${query_id}&id=${userID}&first_name=${firstName}` });
                }
            }
            // Ensure response is sent only once
            res.status(200).send('OK');
        } catch (error) {
            console.error('Error in processing update:', error);
            res.status(500).send('Internal Server Error');
        }
    } else {
        res.status(405).send('Method Not Allowed');
    }
};

