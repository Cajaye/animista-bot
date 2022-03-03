const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require("discord.js");

const AnimeFact = require("anime-facts");
const api = new AnimeFact(process.env.ANIFACT_TOKEN);

module.exports = {
    data: new SlashCommandBuilder().setName("anifact").setDescription("Random anime fact"),
    async execute(interaction) {
        const res = await api.getFact();
        const { fact } = res;
        const message = new MessageEmbed().setColor('#0099ff')
            .setTitle('Animista')
            .setURL('https://animista.vercel.app/')
            .setDescription('Get a random anime fact')
            .setTimestamp()
            .addFields({ name: "Fact", value: fact })
        await interaction.reply({ embeds: [message] });
    }
}