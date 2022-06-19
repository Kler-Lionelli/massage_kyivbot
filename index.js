const { Telegraf, Markup } = require('telegraf')
require('dotenv').config()
const text = require('./const')

const bot = new Telegraf(process.env.BOT_TOKEN)
bot.start((ctx) => ctx.reply(`Привіт ${ctx.message.from.first_name ? ctx.message.from.first_name : 'незнайомець'}!`))
bot.help((ctx) => ctx.reply(text.commands))
bot.on('sticker', (ctx) => ctx.reply('👍'))
bot.hears('hi', (ctx) => ctx.reply('Hey there'))
bot.launch()

bot.command('course', async (ctx) => {
    try {
        await ctx.replyWithHTML('<b>Виберіть массаж</b>', Markup.inlineKeyboard(
            [
                [Markup.button.callback('Массаж спини', 'btn_1'), Markup.button.callback('Массаж голови', 'btn_2')],
                [Markup.button.callback('Массаж моделюючий', 'btn_3'), Markup.button.callback('Массаж стопи', 'btn_4')]
            ]
        ))
    } catch (e) {
        console.error(e)
    }
})


function addActionBot(name, src, text) {
    bot.action(name, async (ctx) => {
        try {
            await ctx.answerCbQuery()
            if (src !== false) {
                await ctx.replyWithPhoto({
                    source: src
                })
            }
            await ctx.replyWithHTML(text, {
            disable_web_page_preview: true
            })
        } catch (e) {
            console.error(e)
        }
    })
}

addActionBot('btn_1', './img/1.jpg', text.text1)
addActionBot('btn_2', './img/2.jpg', text.text2)
addActionBot('btn_3', './img/3.jpg', text.text3)
addActionBot('btn_4', false, text.text4)

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))