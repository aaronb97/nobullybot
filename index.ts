/* eslint-disable no-console */
import Discord, { Client } from "discord.js";
import dotenv from "dotenv";

import messageCallbackGenerator from "./callbacks/messageCallback";
import messageReactionAddGenerator from "./callbacks/messageReactionAddCallback";

dotenv.config();

const client = new Discord.Client({
  partials: ["MESSAGE", "CHANNEL", "REACTION"],
}) as Client;

client.once("ready", () => {
  console.log("Ready!");
});

client.on("message", messageCallbackGenerator(client));
client.on("messageReactionAdd", messageReactionAddGenerator(client));

client.login(process.env.TOKEN);
