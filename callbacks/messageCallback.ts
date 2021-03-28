import { Client, Message } from "discord.js";

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

export const messageCallbackGenerator = (client: Client) => {
  return (message: Message) => {
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
  };
};
