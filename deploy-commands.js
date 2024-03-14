// beacuse SlashCommandBuilder already required in each command file
//const { SlashCommandBuilder } = require('@discordjs/builders');
const fs = require('fs');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

//we cant use this code in this replit
//I wanna my commands be global commands
// eslint-disable-next-line no-unused-vars
const { clientId, guildId, token } = require('./config.json');
//const { clientId, token } = require('./config.json');

//we must use this secret environtment in replit
//const clientId = process.env['clientId'];
//const guildId = process.env['guildId'];
//const token = process.env['token'];
//const mySecret = process.env['token'];


const commands = [];
    //commands is still typed here manually for basic
	//new SlashCommandBuilder().setName('beep').setDescription('Replies with boop!'),
	//new SlashCommandBuilder().setName('server').setDescription('Replies with server info!'),
	//new SlashCommandBuilder().setName('user').setDescription('Replies with user info!'),
//]
    //if this basic needed, please delete the semi-colomn at "commands = [];
	//.map(command => command.toJSON());

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	commands.push(command.data.toJSON());
}

//the real source code
const rest = new REST({ version: '9' }).setToken(token);

//cause in replit different environtment
//const rest = new REST({ version: '9' }).setToken(mySecret);

//idk wrong place, should place this in main.js?
//oh, actually not
(async () => {
	try {
		console.log('Started refreshing application (/) commands.');

      //this is for global commands
		    //await rest.put(
			  //Routes.applicationGuildCommands(clientId),
			  //{ body: commands },
		  //);

      //this is for guild commands
        //await rest.put(
			  //Routes.applicationGuildCommands(clientId, guildId),
			  //{ body: commands },
		  //);

      //this is for experimental
        await rest.put(
        Routes.applicationCommands(clientId),
        { body: commands },
      );

      //this is for replit
        //await rest.put(
        //Routes.applicationCommands(process.env['clientId']),
        //{ body: commands },
      //);

		console.log('Successfully reloaded application (/) commands.');
	} catch (error) {
		console.error(error);
	}
})();

//the basic to register the commands 
/*rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
	.then(() => console.log('Successfully registered application commands.'))
	.catch(console.error);
    */


//i wanna put it to global commands
/*rest.put(Routes.applicationGuildCommands(clientId), { body: commands })
    .then(() => console.log('Successfully registered application commands.'))
    .catch(console.error);
    */