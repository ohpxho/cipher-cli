const cipherF = require('../script/file'); 
const yargs = require("yargs");
const chalk = require('chalk');

function positionals(yargs) {
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

function exec(argv, _obj, _title) {
	try {
	    if(argv.type == 'enc') {
	      
	      if(argv.text) {
	        let encryptedText = _obj.encrypt(argv.text);
	        console.log(chalk.green(encryptedText));
	        return;
	      }

	      if(argv.file) {
	        let encryptedText = cipherF.encrypt(_title, argv.file);
	        console.log(chalk.green(encryptedText));
	        return; 
	      }

	    } else if (argv.type === 'dec') {
	      
	      if(argv.text) {
	        let encryptedText = _obj.decrypt(argv.text);
	        console.log(chalk.green(encryptedText));
	        return;
	      }

	      if(argv.file) {
	        let encryptedText = cipherF.decrypt(_title, argv.file);
	        console.log(chalk.green(encryptedText));
	        return; 
	      }

	    }
	  
	    console.log(chalk.red('wrong command')); 
  } catch(err) {

  }
}

module.exports = {
	positionals,
	exec
}