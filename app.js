const { Highrise, Events, Emotes } = require("highrise.sdk.dev")
const config = require("./config")

const bot = new Highrise({
    Events: [
        Events.Messages,
        Events.DirectMessages,
        Events.Movements
    ],
    AutoFetchMessages: true,
});
let mes;

bot.login(config.token, config.room_id)
console.log("working")
bot.on("ready", (session) => {
    console.log("Bot Online")
})
bot.on("error", (message) => {
    console.log(message)

})
bot.on("chatCreate", (user, message) => {
    if (bot.info.user.id === user.id) return;


    mes = message;
    if (message === "hi") {
        bot.message.send("Hello, world!").catch(e => console.error(e))
        bot.player.emote(config.bot_id, "dance-blackpink").catch(e => console.error(e))

    }
    bot.on("playerMove", (user, position) => {

        if (mes === "Follow me") {
            bot.move.walk(position.x, position.y, position.z, position.facing)
                .catch(e => console.error(e)).f;

        }
        if (mes === "Stop") {

            mes = "Stop"
            return
        }
    })



}
)
bot.on("messageCreate", (user_id, data, message) => {
    if (message === "hello") {
        bot.direct.send(data.id, "Hay naku").catch(e => console.error(e));
    }
});




bot.on("playerMove", (user, position) => {

    if (mes === "Follow me") {
        bot.move.walk(position.x, position.y, position.z, position.facing)
            .catch(e => console.error(e)).f;

    }
    if (mes === "Stop") {

        mes = "Stop"
        return
    }
})