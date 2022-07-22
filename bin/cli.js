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
  .command(
    'caesar <type> [text, file]', 
    'caesar encryption algo' , 
    (yargs) => caesarPositionals(yargs), 
    (argv) => caesarExec(argv)
  )
  .help()
  .argv


function caesarPositionals(yargs) {
  yargs
    .positional('type', {
      type: 'string',
      default: 'enc',
      describe: 'action type'
    })
    .positional('text', {
       type: 'string',
       describe: 'the text to encrypt/decrypt'
    })
    .positional('file', {
       type: 'string',
       describe: 'the file to encrypt/decrypt'
    });
}


function caesarExec(argv) {
  try {
    if(argv.type == 'enc') {
      if(argv.text) {
        let encryptedText = cipherT.caesar.encrypt(argv.text);
        console.log(chalk.green(encryptedText));
        return;
      }

      if(argv.file) {
        let encryptedText = cipherF.encrypt('caesar', argv.file);
        console.log(chalk.green(encryptedText));
        return; 
      }

    } else if (argv.type === 'dec') {
      if(argv.text) {
        let encryptedText = cipherT.caesar.decrypt(argv.text);
        console.log(chalk.green(encryptedText));
        return;
      }

      if(argv.file) {
        let encryptedText = cipherF.decrypt('caesar', argv.file);
        console.log(chalk.green(encryptedText));
        return; 
      }
    }
  
    console.log(chalk.red('wrong command')); 
  
  } catch(err) {

  }
}