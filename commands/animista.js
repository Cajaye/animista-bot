const { SlashCommandBuilder } = require('@discordjs/builders');
const axios = require('axios').default;
const { MessageEmbed } = require("discord.js");
let url = `https://animechan.vercel.app/api/`


module.exports = {
    data: new SlashCommandBuilder()
        .setName("animista")
        .setDescription("Get a random anime quote"),
    async execute(interaction) {
        const res = await axios.get(`${url}random`);
        if (res.status == 404) {
            return interaction.reply(`Try again`);
        }
        const { anime, character, quote } = res.data;
        const message = new MessageEmbed()
            .setColor('#0099ff').setTitle('Animista')
            .setURL('https://animista.vercel.app/')
            .setDescription('Get a random anime quote')
            .setTimestamp()
            .addFields({ name: "Anime", value: anime }, { name: "Character", value: character }, { name: "Quote", value: quote })
        await interaction.reply({ embeds: [message] });
    }
}