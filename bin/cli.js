#!/usr/bin/env node
const cipherT = require('../script/cipher');
const cipherF = require('../script/file'); 
const yargs = require("yargs");
const chalk = require('chalk');

const options = yargs
  .scriptName("cip")
  .usage('$0 <cmd> [args]')
  .command('$0', 'the default command', () => {}, (argv) => {
    console.log('Welcome')
  })
  .command('caesar [text, file]', 'caesar encryption algo' ,(yargs) => {
    yargs
      .positional('text', {
         type: 'string',
         describe: 'the text to encrypt'
      })
      .positional('file', {
         type: 'string',
         describe: 'the file to encrypt'
      })

  }, function (argv) {

  	if(argv.text) {
  		let encryptedText = cipherT.caesar(argv.text);
  		console.log(chalk.green(encryptedText));
  		return;
  	}

  	if(argv.file) {
  		let encryptedText = cipherF('caesar', argv.file);
      console.log(chalk.green(encryptedText));
  		return;	
  	}

    console.log(chalk.red('wrong command'));
  		
  })
  .help()
  .argv