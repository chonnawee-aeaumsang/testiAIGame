const TelegramBot = require('node-telegram-bot-api');
const token = '7784233435:AAElh1jUghg5Nbuh22mprl1xPq8BvTYzTQg';
const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    
    const options = {
        reply_markup: {
            inline_keyboard: [
                [{ text: "What are your hours? ⏰", callback_data: 'hours' }],
                [{ text: "Can I track my order? 📦", callback_data: 'track_order' }],
                [{ text: "How do I report a problem?", callback_data: 'report_problem' }]
            ]
        }
    };

    bot.sendMessage(chatId, 'How can I help you?', options);
});

bot.on('callback_query', (query) => {
    const chatId = query.message.chat.id;

    let responseText;
    switch (query.data) {
        case 'hours':
            responseText = 'Our hours are from 9 AM to 5 PM.';
            break;
        case 'track_order':
            responseText = 'You can track your order by clicking [here](https://yourtrackinglink.com).';
            break;
        case 'report_problem':
            responseText = 'Please describe your issue, and we will assist you shortly.';
            break;
        default:
            responseText = 'I\'m not sure how to help with that.';
    }

    bot.sendMessage(chatId, responseText, { parse_mode: 'Markdown' });
    bot.answerCallbackQuery(query.id); // Acknowledge the callback
});
