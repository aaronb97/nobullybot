//import { Message, MessageReaction } from "discord.js";
require("dotenv").config();

const Discord = require("discord.js");
const client = new Discord.Client({
  partials: ["MESSAGE", "CHANNEL", "REACTION"],
});

client.once("ready", () => {
  console.log("Ready!");
});

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

client.on("message", (message) => {
  if (message.mentions.has(client.user)) {
    const messages = [
      "Bullybot is coolybot",
      "You cannot bully the no bully bot",
    ];
    message.channel.send(messages[getRandomInt(messages.length)]);
  }

  if (message.content === "!ping") {
    message.channel.send("Pong.");
  }

  if (message.content.includes("/rate")) {
    message.channel.send("Wrong bot");
  }
});

client.on("messageReactionAdd", async (reaction, user) => {
  // When we receive a reaction we check if the reaction is partial or not
  if (reaction.partial) {
    // If the message this reaction belongs to was removed the fetching might result in an API error, which we need to handle
    try {
      await reaction.fetch();
    } catch (error) {
      console.error("Something went wrong when fetching the message: ", error);
      // Return as `reaction.message.author` may be undefined/null
      return;
    }
  }
  // Now the message has been cached and is fully available

  if (reaction.emoji.name === "helpful" && reaction.count >= 3) {
    const reactionEmoji = reaction.message.guild.emojis.cache.find(
      (emoji) => emoji.name === "helpful"
    );
    reaction.message.react(reactionEmoji);
  }

  if (reaction.emoji.name === "wholesome" && reaction.count >= 3) {
    const reactionEmoji = reaction.message.guild.emojis.cache.find(
      (emoji) => emoji.name === "wholesome"
    );
    reaction.message.react(reactionEmoji);
  }

  if (reaction.emoji.name === "wholesomepro" && reaction.count >= 3) {
    const reactionEmoji = reaction.message.guild.emojis.cache.find(
      (emoji) => emoji.name === "wholesomepro"
    );
    reaction.message.react(reactionEmoji);
  }

  if (
    reaction.emoji.name === "nobully" &&
    reaction.count >= 5 &&
    reaction.message.author !== client.user
  ) {
    if (reaction.message.author === client.user) {
      reaction.message.edit(
        `${reaction.message.content}\nYou cannot bully the no bully bot!!!`
      );
    } else {
      reaction.message.delete();
      reaction.message.channel.send(
        `${reaction.message.author} No bullying!!! Your message has been deleted.`
      );
    }
  }

  if (
    reaction.emoji.name === "redditgold" &&
    reaction.message.author === client.user &&
    !reaction.message.content.includes("Thanks")
  ) {
    reaction.message.edit(
      `${reaction.message.content}\nEdit: Thanks for the gold, kind stranger!`
    );
  }
});

console.log(process.env);
client.login(process.env.TOKEN);
