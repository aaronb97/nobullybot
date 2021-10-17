import { Client, Message } from "discord.js";
import emojiRegex from "emoji-regex";

function getRandomInt(max: number) {
  return Math.floor(Math.random() * Math.floor(max));
}

const messageCallbackGenerator =
  (client: Client) =>
  (message: Message): void => {
    if (
      client.user &&
      message.mentions.has(client.user) &&
      !message.content.includes("everyone")
    ) {
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

    const spaceSplit = message.content.split(" ");
    for (let i = 0; i < spaceSplit.length - 2; i += 1) {
      if (
        spaceSplit[i].toLocaleLowerCase() === "react" &&
        spaceSplit[i + 1].toLocaleLowerCase() === "with"
      ) {
        const matches = spaceSplit[i + 2].match(emojiRegex());
        matches?.forEach((match) => message.react(match));

        const customEmojis = /:(.*?):/g.exec(spaceSplit[i + 2]);
        customEmojis?.forEach((name) => {
          const reactionEmoji = message.guild?.emojis.cache.find(
            (emoji) => emoji.name === name,
          );

          if (reactionEmoji) {
            message.react(reactionEmoji);
          }
        });
      }
    }

    const newlineSplit = message.content.split("\n");
    if (newlineSplit.length > 1) {
      newlineSplit.forEach((line) => {
        const lineSpaceSplit = line.split(" ");
        const emojiMatch = lineSpaceSplit[0].match(emojiRegex());
        if (emojiMatch?.length === 1) {
          message.react(emojiMatch[0]);
        }

        const customEmojis = /:(.*?):/g.exec(lineSpaceSplit[0]);
        customEmojis?.forEach((name) => {
          const reactionEmoji = message.guild?.emojis.cache.find(
            (emoji) => emoji.name === name,
          );

          if (reactionEmoji) {
            message.react(reactionEmoji);
          }
        });
      });
    }
  };

export default messageCallbackGenerator;
