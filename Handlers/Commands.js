const { Perms } = require("../Validation/permissions");
const { Client } = require("discord.js");
const { promisify } = require("discord.js");
const { glob } = require("glob");
const { Ascii } = require("ascii-table") 
const PG = promisify(glob);

/**
 * 
 * @param {Client} client 
 */

module.exports = async (client) => {
    const Table = new Ascii("commande chargée");

    commandsArray = []

    (await PG (`${process.cwd()}/Commands/*/*.js`)).map(async (file) => {
        const command = require(file);

        if(!command.name)
        return Table.addRow(file.split("/")[7], "⛔ - ERREUR", "Nom manquant.");

        if(command.context && !command.description)
        return Table.addRow(command.name, "⛔ - ERREUR", "Description manquante.");

        if(command.permission) {
            if(Perms.includes(command.permission))
            command.defaultPermission = false
            else
            return Table.addRow(command.name, "⛔ - ERREUR", "Permissions invalide.")
        }

        client.commands.set(command.name, command);
        CommandsArray.push(command);

        await Table.addRow(command.name, "✅ - SUCCES")
    });

    console.log(Table.toString());

    //  Permet de vérifier les permission //

    client.on("ready", async() => {
        const MainGuild = await client.guild.cache.get("858047832950177813");

        MainGuild.commands.set(commandArray).then(async (command) => {
            const Roles = (commandName) => {
                const cmdPerms = CommandsArray.find((c) => c.name === commandName).permission;
                if(!cmdPerms) return null;

                return MainGuild.roles.cache.filter((r) => r.permissions.has(cimdPerms));
            }

        const fullPermissions = command.reduce((accumulator, r) => {
            const roles = Roles(r.name);
            if(!roles) return accumulator;
            
            const permissions = roles.reduce((a, r) =>  {
                return [...a, {id: r.id, type: "ROLE", permissions: true}]
            }, []);


            return [...accumulator, {id: r.id, permissions }];
        }, []);

        await MainGuild.commands.permissions.set({ fullPermissions })

        })
    });
}
