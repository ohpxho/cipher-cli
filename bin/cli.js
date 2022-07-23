#!/usr/bin/env node
const cipherT = require('../script/cipher');
const yargs = require("yargs");
const chalk = require('chalk');

const config = require('./config');

const options = yargs
  .scriptName("cip")
  .usage('$0 <cmd> [args]')
  .command('$0', 'the default command', () => {}, (argv) => {
    console.log('Welcome')
  })
  .command(
    'caesar <type> [text, file]', 
    'caesar encryption algo' , 
    (yargs) => config.positionals(yargs), 
    (argv) => config.exec(argv, cipherT.caesar, 'caesar')
  )
  .command(
    'affine <type> [text, file]', 
    'affine encryption algo' , 
    (yargs) => config.positionals(yargs), 
    (argv) => config.exec(argv, cipherT.affine, 'affine')
  )
  .command(
    'rot13 <type> [text, file]', 
    'rot13 encryption algo' , 
    (yargs) => config.positionals(yargs), 
    (argv) => config.exec(argv, cipherT.rot13, 'rot13')
  )
  .help()
  .argv


