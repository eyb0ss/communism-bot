const Discord = require('discord.js')
module.exports = {
    name: 'wholesome',
    description: 'memes',
    execute(message, args){

        const fetch = require('node-fetch');

        if(args[0] === 'ws') {

            function loadMemes() {
              return fetch('https://www.reddit.com/r/wholesomememes.json?limit=800&?sort=hot&t=all%27')
              .then(res => res.json())
              .then(json => json.data.children);
            }

            function postRandomMeme(message) {
                return loadMemes().then(posts => {

                    const {title, url} = posts[Math.floor(Math.random() * posts.length)].data;

                    const memesEmbed = new Discord.MessageEmbed()

                    .setColor('#34eb71')
                    .setTitle(title)
                    .setAuthor('r/wholesomememes')
                    .setImage(url)
                    .setTimestamp()
                    .setFooter('Made by FS.LigmaSquad, with love from CupOfT3a and JamesMeow');

                    return message.channel.send(memesEmbed);

                })
            }

            postRandomMeme(message)

        }
    }
}