const { Client } = require("discord.js")
const { Database } = require("../../config.json");
const mongoose = require("mongoose")

module.exports = {
    name: "ready",
    once: true,
    /**
     * 
     * @param {Client} client 
     */
    execute(client) {
        console.log("le bot est en ligne sur discord")
        client.user.setActivity("Bot developper par EwozZ_YT | help", {type: "PLAYING"});

        if(!Database) return;
        mongoose.connect(Database, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }).then(() => {
            console.log("le client est connecter a la base de donnée.")
        }).catch((err) => {
            console.log(err)
        })
    }
}