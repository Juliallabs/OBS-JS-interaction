const fs = require('fs');
const Tmi = require('tmi.js');
const moment = require('moment');
const axios = require("axios")
const canal = "julialabs"

const options = JSON.parse(fs.readFileSync('options.json'));

const twitch = new Tmi.client(options);

const getMessages = async() => {
    
    //const response = await axios('https://api.catarse.me/project_details?project_id=eq.137376');
    const response = await axios(' https://api.catarse.me/project_details?project_id=eq.128212');

    const data = response.data;

    const [{
        remaining_time: { total: tempoQueFalta },
        total_contributors,
        progress
    }] = data;

    return [
        `${total_contributors} pessoas já apoiaram EletroBlocks no CATARSE e faltam  ${tempoQueFalta} dias para a campanha finalizar.`,
        `${progress} d`
    ];
};

twitch.on('message', async(channel, tags, message, self) => {
    if (message === '!eletroblocks') {
        const data = await getMessages();
        twitch.action(canal, data[0])
    } else if (message === '!meninoprodigio') {
        twitch.action(canal, "Davisinho D+ :D");
    } else if (message === '!catarse') {
        twitch.action(canal, 'catarse.me/eletroblocks')
    }
});
var start = function(){
    $("hi").text(progress);
}

start();
twitch.connect().then(() => console.log(":D")).catch(console.log)