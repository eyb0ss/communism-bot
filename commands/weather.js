const Discord = require('discord.js')
module.exports = {
    name: 'w',
    description: 'weather',
    execute(message, args){

        const fetch = require('node-fetch');

        if(args[0] === 'w') {

            function loadMemes() {
              return fetch('https://www.nea.gov.sg/weather#weather-forecast2hr')
              .then(res => res.json())
              .then(json => json.data.children);
            }

            function postRandomMeme(message) {
                return loadMemes().then(posts => {

                    const {title, url} = posts[Math.floor(Math.random() * posts.length)].data;

                    const memesEmbed = new Discord.MessageEmbed()

                    .setColor('#34eb71')
                    .setTitle(title)
                    .setAuthor('Taken from nea.gov.sg/weather')
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