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
let userToFollow;

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
    if (user.username === "Jom_" || user.username === "itsmeuyun") {
        let command = message.match(/Follow/g)
        if (command === null) {
            userToFollow = ""
        }
        console.log(command)
        if (command[0] === "Follow") {
            console.log(message.match(/Follow/g)[0])
            userToFollow = message.match(/(@.+)/g)[0]
            userToFollow = userToFollow.slice(1)

        }

    }
    bot.on("playerMove", (user, position) => {
        console.log(userToFollow)
        console.log(user.username)

        if (user.username === userToFollow) {
            bot.move.walk(position.x, position.y, position.z, position.facing).catch((e) => {
                console.log(e)
            })

        }
        // }

    })



}
);


function followCommand() {

}
bot.on("messageCreate", (user_id, data, message) => {
    if (message === "hello") {
        bot.direct.send(data.id, "Hay naku").catch(e => console.error(e));
    }
});