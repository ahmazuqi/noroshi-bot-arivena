const { EmbedBuilder, MessageFlags } = require('discord.js');
const crc = require('crc');
const fs = require('fs');
const chalk = require("chalk");

/**
 * Logs a message with optional styling.
 *
 * @param {string} string - The message to log.
 * @param {'info' | 'err' | 'warn' | 'done' | undefined} style - The style of the log.
 */
const log = (string, style) => {
  const styles = {
    info: { prefix: chalk.blue("[INFO]"), logFunction: console.log },
    err: { prefix: chalk.red("[ERROR]"), logFunction: console.error },
    warn: { prefix: chalk.yellow("[WARNING]"), logFunction: console.warn },
    done: { prefix: chalk.green("[SUCCESS]"), logFunction: console.log },
  };
  
  const selectedStyle = styles[style] || { logFunction: console.log };
  selectedStyle.logFunction(`${selectedStyle.prefix || ""} ${string}`);
};

/**
 * Formats a timestamp.
 *
 * @param {number} time - The timestamp in milliseconds.
 * @param {import('discord.js').TimestampStylesString} style - The timestamp style.
 * @returns {string} - The formatted timestamp.
 */
const time = (time, style) => {
  return `<t:${Math.floor(time / 1000)}${style ? `:${style}` : ""}>`;
};

/**
 * Whenever a string is a valid snowflake (for Discord).

 * @param {string} id 
 * @returns {boolean}
 */
const isSnowflake = (id) => {
  return /^\d+$/.test(id);
};

/**
 * Whenever a string is a valid IntSucces (for Discord).

 * @param {string} id 
 * @returns {boolean}
 */
 const IntSucces = async(interaction, args) => {
    const msgEmbed = new EmbedBuilder()
    .setDescription(args)
    .setColor('Green')
    return interaction.reply({ embeds: [msgEmbed], flags: MessageFlags.Ephemeral })
}

/**
 * Whenever a string is a valid IntError (for Discord).

 * @param {string} id 
 * @returns {boolean}
 */
const IntError = async(interaction, args) => {
    const msgEmbed = new EmbedBuilder()
    .setDescription(args)
    .setColor('Red')
    return interaction.reply({ embeds: [msgEmbed], flags: MessageFlags.Ephemeral })
}

/**
 * Whenever a string is a valid IntUsage (for Discord).

 * @param {string} id 
 * @returns {boolean}
 */
const IntUsage = async(interaction, args) => {
    const msgEmbed = new EmbedBuilder() 
    .setDescription(args)
    .setColor('Yellow')
    return interaction.reply({ embeds: [msgEmbed], flags: MessageFlags.Ephemeral })
}

module.exports = {
  log,
  time,
  isSnowflake,
  
  //Interaction Message
  IntSucces,
  IntError,
  IntUsage
};
