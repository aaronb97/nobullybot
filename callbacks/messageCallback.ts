import { Client, Message } from "discord.js";

function getRandomInt(max: number) {
  return Math.floor(Math.random() * Math.floor(max));
}

const messageCallbackGenerator =
  (client: Client) =>
  (message: Message): void => {
    if (
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
  };

export default messageCallbackGenerator;
