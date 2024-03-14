//for reach monitor to server
const keepAlive = require('./server');

// Require the necessary discord.js classes
const fs = require('fs');
const { Client, Collection, Intents } = require('discord.js');
// im trying to add this
const Discord = require('discord.js');
const { token } = require('./config.json');

//prefix of the bot
const prefix = '?';
// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
// following const discord
const bot = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"] });


//i'm add new code here
client.on('messageCreate', messageCreate =>{
	//bot.once('message', message =>{
	if(!messageCreate.content.startsWith(prefix) || messageCreate.author.bot) return;
	//Bot does nothing if command not start with prefix or from the bot itself

	//for multiple commands

	const args = messageCreate.content.slice(prefix.length).split(/ +/);
	//commands only run in lowercase
	const prefixcommand = args.shift().toLowerCase();

	if(prefixcommand === 'tes'){
	messageCreate.channel.send('ada apa ping gw?');
	}
});

// Read the commands
client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	// Set a new item in the Collection
	// With the key as the command name and the value as the exported module
	client.commands.set(command.data.name, command);
}

// When the client is ready, run this code (only once)
client.once('ready', () => {
	console.log('Ready!');
    //.then(() => console.log('Successfully registered application commands.'))
	//.then(() => .catch(console.error));
});

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}

    //if/else command basic
	/*
    const { commandName } = interaction;

    if (commandName === 'beep') {
		await interaction.reply('boob!');
	} else if (commandName === 'server') {
        await interaction.reply(`Server name: ${interaction.guild.name}\nTotal members: ${interaction.guild.memberCount}`);
		//await interaction.reply('Server info.');
	} else if (commandName === 'user') {
		await interaction.reply(`Your tag: ${interaction.user.tag}\nYour id: ${interaction.user.id}`);
        //await interaction.reply('User info.');
	}
    */
});

/* this is the source code of prefix commands
	client.on('message', message =>{
	//bot.once('message', message =>{
	if(!message.content.startsWith(prefix) || message.author.bot) return;
	//Bot does nothing if command not start with prefix or from the bot itself

	//for multiple commands

	const args = message.content.slice(prefix.length).split(/ +/);
	//commands only run in lowercase
	const prefixcommand = args.shift().toLowerCase();

if(prefixcommand === 'ping'){
message.channel.send('ada apa ping gw?');
}
});
*/

//this is run the server monitor
keepAlive()
// Login to Discord with your client's token
client.login(token);