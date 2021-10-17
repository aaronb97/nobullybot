import { Client, MessageReaction } from "discord.js";

import * as Messaging from "../messaging";

const messageReactionAddGenerator =
  (client: Client) =>
  async (reaction: MessageReaction): Promise<void> => {
    // When we receive a reaction we check if the reaction is partial or not
    if (reaction.partial) {
      // If the message this reaction belongs to was removed the fetching might result in an API error, which we need to handle
      try {
        await reaction.fetch();
      } catch (error) {
        console.error(
          "Something went wrong when fetching the message: ",
          error,
        );
        // Return as `message.author` may be undefined/null
        return;
      }
    }
    // Now the message has been cached and is fully available

    const { count, emoji, message } = reaction;

    const emojiNames = [
      "helpful",
      "helpfulgold",
      "wholesome",
      "wholesomepro",
      "based",
    ];

    if (count >= 3 && emojiNames.includes(emoji.name)) {
      const name = emojiNames.find((x) => x === emoji.name);
      const reactionEmoji = message.guild.emojis.cache.find(
        (_emoji) => _emoji.name === name,
      );
      message.react(reactionEmoji);
    }

    if (
      emoji.name === "nobully" &&
      count >= parseInt(process.env.EMOJI_COUNT ?? "5")
    ) {
      if (
        message.author === client.user &&
        !message.content.includes(Messaging.CANNOT_BULLY_THE_BOT)
      ) {
        message.edit(`${message.content}\n${Messaging.CANNOT_BULLY_THE_BOT}`);
      } else {
        message.channel.send(`${message.author.toString()} No bullying!!!`);
      }
    }

    if (
      emoji.name === "redditgold" &&
      message.author === client.user &&
      !message.content.includes(Messaging.THANKS_FOR_GOLD)
    ) {
      message.edit(`${message.content}\n${Messaging.THANKS_FOR_GOLD}`);
    }
  };

export default messageReactionAddGenerator;
