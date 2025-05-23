import type { BotState } from "../states/bot-state";

import type { Command } from "../types";

import { ChatInputCommandInteraction, MessageFlags, SlashCommandBuilder } from "discord.js";

const command = new SlashCommandBuilder()
    .setName("start")
    .setDescription("Começa a assistir as mensagens.");

const execute = async (interaction: ChatInputCommandInteraction, botState: BotState) => {
    const channelId = interaction.channelId;

    if (botState.isWatching()) {
        await interaction.reply({
            content: `⚠️ Atenção: As mensagens do canal <#${botState.channelId()}> já estão sendo monitoradas.`,
            flags: [MessageFlags.Ephemeral],
        });
    } else {
        botState.startWatching();
        botState.setChannelId(channelId);
        await interaction.reply(
            `✅ Inicializado: As mensagens do canal <#${botState.channelId()}> agora estão sendo monitoradas.`
        );
    }
};

export const startCommand: Command = {
    data: command,
    execute,
};
