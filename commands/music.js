const { VoiceConnection } = require("discord.js");

const queue = new Map();

module.exports = {
    name: 'play',
    description: 'plays music lol',
    
    execute(message, args, prefix){

        const ytdl = require('ytdl-core');
       
        const serverQueue = queue.get(message.guild.id);

        if (message.content.startsWith(`${prefix}play`)) {
            execute(message, serverQueue);
            return;
        
        } else if (message.content.startsWith(`${prefix}p`)) {
            execute(message, serverQueue);
            return;

        } else if (message.content.startsWith(`${prefix}skip`)) {
            skip(message, serverQueue);
            return;

        } else if (message.content.startsWith(`${prefix}die`)) {
            die(message, serverQueue);
            return;

        } else if (message.content.startsWith(`${prefix}queue`)) {
            thequeue(message, serverQueue);
            return;

        } else if (message.content.startsWith(`${prefix}dc`)) {
            die(message, serverQueue);
            return;

        } else if (message.content.startsWith(`${prefix}volume`)) {
            volume(message, serverQueue);
            return;

        } else {
            message.channel.send("You need to enter a valid command!");
        }

        async function execute(message, serverQueue) {
            const voiceChannel = message.member.voice.channel;

            if (!voiceChannel) return message.channel.send(
                "Join a voice chat to play!"
                );
              
            const permissions = voiceChannel.permissionsFor(message.client.user);
            if (!permissions.has("CONNECT") || !permissions.has("SPEAK")) {
                return message.channel.send(
                "I need the permissions to join and speak in your voice channel!"
                );
            }
            if(!args[0]) {
                message.channel.send('Send the link of your song!');
                return;
    
            }

            const songInfo = await ytdl.getInfo(args[0]);

            const song = {
                title: songInfo.videoDetails.title,
                url: songInfo.videoDetails.video_url,
            };
                
            if (!serverQueue) {
                const queueContruct = {
                    textChannel: message.channel,
                    voiceChannel: voiceChannel,
                    connection: null,
                    songs: [],
                    volume: 5,
                    playing: true,
                };

                queue.set(message.guild.id, queueContruct);
        
                queueContruct.songs.push(song);
                
                try {
                    var connection = await voiceChannel.join();
                    queueContruct.connection = connection;
                    play(message.guild, queueContruct.songs[0]);
                
                } catch (err) {
                    console.log(err);
                    queue.delete(message.guild.id);
                    return message.channel.send(err);
                
                }
    
            } else {
                serverQueue.songs.push(song);
                console.log(serverQueue.songs);
                return message.channel.send(`**${song.title}** has been queued!`);
            }
        
        
        }

        function thequeue(message, serverQueue) {
            console.log(serverQueue.songs)
            message.channel.send(serverQueue.songs)
        }


        function play(guild, song) {
            const serverQueue = queue.get(guild.id);

            if (!song) {
              serverQueue.voiceChannel.leave();
              queue.delete(guild.id);
              return;
            }

            const dispatcher = serverQueue.connection
            .play(ytdl(song.url))
            .on("finish", () => {
                serverQueue.songs.shift();
                play(guild, serverQueue.songs[0]);
            })
            
            .on("error", error => console.error(error));
            dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
            serverQueue.textChannel.send(`Now playing : **${song.title}**`);

            console.log(serverQueue.songs)
            console.log(song.title)
        }

        function skip(message, serverQueue) {
            if (!message.member.voice.channel)
            return message.channel.send(
                "Join a voicechannel to skip!"
                );

            if (!serverQueue)
            return message.channel.send("Nothing is playing in this server!");

            serverQueue.connection.dispatcher.end();
        
        }

        function die(message, serverQueue) {
            serverQueue.songs = [];
            serverQueue.connection.dispatcher.end();
        }

    }
}