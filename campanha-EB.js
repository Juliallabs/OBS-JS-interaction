const fs = require('fs');
const Tmi = require('tmi.js');
const moment = require('moment');
const axios = require("axios");
const express = require('express');
const canal = "julialabs"
var last_total_contributors;

const app = express();
const sse = require('easy-server-sent-events');

const options = JSON.parse(fs.readFileSync('options.json'));

const twitch = new Tmi.client(options);

const optionsSSE = {
    endpoint: '/api/sse',
    script: '/sse.js'
};
const {SSE, send, openSessions, openConnections} = sse(optionsSSE);

function sendSSEMessage(send) {
    send(
      'all',
      'newcity',
      {
        cool: true,
        content: 'This is a message sent ' + new Date().toLocaleTimeString()
      }
    );
  }

const getMessages = async() => {
    
    //const response = await axios('https://api.catarse.me/project_details?project_id=eq.137376');
    const response = await axios(' https://api.catarse.me/project_details?project_id=eq.128212');

    const data = response.data;

    const [{
        remaining_time: { total: tempoQueFalta },
        total_contributors,
        progress
    }] = data;

   last_total_contributors = total_contributors;

    return [
        `${total_contributors} pessoas já apoiaram EletroBlocks no CATARSE e faltam  ${tempoQueFalta} dias para a campanha finalizar.`,
        `${progress} d`
    ];

    
};

twitch.on('message', async(channel, tags, message, self) => {
    if (message === '!eletroblocks') {
        const data = await getMessages();
        twitch.action(canal, data[0])
        sendSSEMessage(send);
    } else if (message === '!meninoprodigio') {
        twitch.action(canal, "Davisinho D+ :D");
    } else if (message === '!catarse') {
        twitch.action(canal, 'catarse.me/eletroblocks')
    }
});

twitch.on("join", (channel, username, self) => {
    if(self) {
      twitch.say(channel, "Estou vivo!");
      }
  });

twitch.connect().then(() => console.log(":D")).catch(console.log);



app.use(SSE);
app.use('/static', express.static('public'));
    app.listen(3000, () => {
    console.log(`Example app listening at http://localhost:${3000}`)
  });

setInterval(() => {
  if (last_total_contributors != getMessages(total_contributors)){
    sendSSEMessage(send);
    last_total_contributors=total_contributors;
  }

}, 500);