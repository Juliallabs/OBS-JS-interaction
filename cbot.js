/**
 * @description Importaçao de blibiotecas
 * 
 * @requires tmi.js
 * @requires fs
 * @requires request
 */
const tmi = require('tmi.js');
const fs = require('fs');
const request = require ('request');
const { SSL_OP_EPHEMERAL_RSA } = require('constants');
/**
 * @description Construção de Objetos
 */
const options = JSON.parse(fs.readFileSync('options.json'));

/**
 * @description Eventos (Funções Callback)
 * @throws Erro quando arduino não conectado corretamente
 */

	/**
	 * @description Configuração e Conexão com API da Twitch.TV
	 */
	const client = new tmi.client(options);
	client.connect();

	/**
	 * @description Quando menssagem enviada
	 * @see raw_message tem os dados brutos de qualquer evento de chat da live (messangem, highlight, host, raid)
	 */

	function delay(ms) {
		return new Promise(resolve => setTimeout(resolve, ms));
	  }

	client.on("raw_message", (messageCloned, message) => {
		//console.log(message);
		// ignorar quando não for uma menssagem no chat
		if (message.command != "PRIVMSG") {
			return;
		}

		// preparar para executar comandos
		let is_highlight = message.tags["msg-id"] == 'highlighted-message';
		let channel = message.params[0];
		let params = message.params[1].slice(1).split(' ');
		let command = params.shift().toLowerCase(); 
        let reward = message.tags["custom-reward-id"];

	
		const regexEspaco = / /g;
		if (command == "eletroblocks") {
            const { Console } = require("console");
            const fetch = require ("node-fetch");
            //fetch('https://api.catarse.me/project_details?project_id=eq.128212')
            fetch('https://api.catarse.me/project_details?project_id=eq.130351')
            .then((response)=>{ return response.json()})
            .then((response)=>{ 
             //console.log(response)
            console.log(response[0].total_contributors)
            console.log(response[0].total_contributions)
            console.log(response[0].progress)

			let texto = message.params[1].slice(10).replace(regexEspaco,"+");
			client.say (message.params[0],"A CAMPANHA ELETROBLOCKS ESTÁ NO AR A "+texto);
		
        
        })}
	});