require('dotenv').config();
const { Client } = require('discord.js');

const client = new Client();
const mySecret = process.env.TOKEN;
const prefix = "+";

let VALOR_INICIAL = 0

client.on("message", function(message) { 
  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;

  const commandBody = message.content.slice(prefix.length);
  const args = commandBody.split(' ');
  const command = args.shift().toLowerCase();
  const channel = message.channel

  if (command === "ping") {
    const timeTaken = Date.now() - message.createdTimestamp;
    message.reply(`Pong! This message had a latency of ${timeTaken}ms.`);                  
  } 

  if (!Number(args)) {
    channel.send(`Para de ser otario: ${message.author}`);
    return;
  }
  
  
  if (command === "start") {
      VALOR_INICIAL = Number(args);
      mensagemStart(message);
  }

  if (command === "add") {
      VALOR_INICIAL++;
      mensagemStart(message);
  }

  if (command === "reset") {
    VALOR_INICIAL = 0;
    channel.send(`Contandor Resetado!`);
}
});

function mensagemStart(message) {
    if (VALOR_INICIAL === 1) {
        channel.send(`O Trouxa morreu: ${VALOR_INICIAL} vez!`);
    } else {
        channel.send(`O Trouxa morreu: ${VALOR_INICIAL} vezes!`);
    }
}

client.login(mySecret);