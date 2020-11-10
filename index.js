const Discord = require('discord.js');
const bot = new Discord.Client();
const fs = require('fs')
echo ;
"# communism-bot";
  README.md
git ;
init
git ;
add ;
README.md
git ;
commit -m ;
"first commit"
git ;
branch -M ;
main
git ;
remote ;
add ;
origin ;
https://github.com/eyb0ss/communism-bot.git
git ;
push -u ;
origin ;
main
bot.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for(const file of commandFiles){
  const command = require(`./commands/${file}`);

  bot.commands.set(command.name, command);
}


const token = 'NzM5MTM1OTA2MTQwOTEzNjY1.XyWD9A.iWJLOW1ElOCjlF6EEuu4FnNnaR8';

const PREFIX = 'k!';

bot.on('ready', () =>{
    console.log('This bot is online!');
})

bot.on('message', message=>{
  
    let args = message.content.substring(PREFIX.length).split(" ");


            if (args[0] === 'help') {

                const helpHelpEmbed = new Discord.MessageEmbed()
                .setColor('#34eb71')
                .setTitle('Command - Help')
                .setDescription('Type k!<command> to execute a command!')
                .addFields(
                  { name: 'Aliases', value: 'help' },
                  { name: 'Description', value: 'Displays all possible commands'},
                  )
                .setTimestamp()
                .setFooter('Our bot since 2020');
        
                message.channel.send(helpHelpEmbed);
        
            }else if(args[0] === 'ws') {
                bot.commands.get('wholesome').execute(message, args);
            }else if(args[0] === 'memes') {
                bot.commands.get('memes').execute(message, args);
            }else if(args[0] === 'rule34') {
                bot.commands.get('rule34').execute(message, args);
            }else if(args[0] === 'aww') {
                bot.commands.get('aww').execute(message, args);
            }else if(args[0] === 't') {
                bot.commands.get('thigh').execute(message, args);
            }else if(args[0] === 'bgh') {
                bot.commands.get('bgh').execute(message, args);
            }else if(args[0] === 'hentai') {
                bot.commands.get('hentai').execute(message, args);
            }
            })


bot.login (token);
