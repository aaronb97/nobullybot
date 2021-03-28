import { Client } from "discord.js";
import { messageCallbackGenerator } from "./callbacks/messageCallback";
import { messageReactionAddGenerator } from "./callbacks/messageReactionAddCallback";

import dotenv from "dotenv";
dotenv.config();

import Discord from "discord.js";
const client = new Discord.Client({
  partials: ["MESSAGE", "CHANNEL", "REACTION"],
}) as Client;

client.once("ready", () => {
  console.log("Ready!");
});

client.on("message", messageCallbackGenerator(client));
client.on("messageReactionAdd", messageReactionAddGenerator(client));

client.login(process.env.TOKEN);
