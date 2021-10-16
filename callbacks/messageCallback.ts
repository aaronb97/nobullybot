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

    const spaceSplit = message.content.split(" ");
    for (let i = 0; i < spaceSplit.length - 2; i += 1) {
      if (
        spaceSplit[i].toLocaleLowerCase() === "react" &&
        spaceSplit[i + 1].toLocaleLowerCase() === "with"
      ) {
        try {
          message.react(spaceSplit[i + 2]);
        } catch (e) {
          console.log(e);
        }
      }
    }
  };

export default messageCallbackGenerator;
