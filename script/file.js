const cipher = require('./cipher');
const fs = require('fs');
const chalk = require('chalk');

function encrypt(type, dir) {
	if(!checkIfTxtFile(dir)) {
		console.log(chalk.red('Not a valid file, txt only'));
		throw new Error("Invalid file");
	}

	let parseTxt = getFileContent(dir);
	let encryptedText = encryptTxtFileContent(type, parseTxt);
	writeFileContent(dir, encryptedText);
	return encryptedText;
}

function decrypt(type, dir) {
	if(!checkIfTxtFile(dir)) {
		console.log(chalk.red('Not a valid file, txt only'));
		throw new Error("Invalid file");
	}

	let parseTxt = getFileContent(dir);
	let decryptedText = decryptTxtFileContent(type, parseTxt);
	writeFileContent(dir, decryptedText);
	return decryptedText;
}

function checkIfTxtFile(dir) {
	const extension = dir.split('.').pop();
	if(extension === 'txt') {
		return true;
	}

	return false;
}

function getFileContent(dir) {
	try {
		const content = fs.readFileSync(dir);
		return content.toString();
	} catch(err) {
		console.log(chalk.red('File not found'))
	}
}

function encryptTxtFileContent(type, text) {
	switch(type) {
		case 'caesar':
			text = cipher.caesar.encrypt(text);
			break;
	}

	return text;
}

function decryptTxtFileContent(type, text) {
	switch(type) {
		case 'caesar':
			text = cipher.caesar.decrypt(text);
			break;
	}

	return text;
}

function writeFileContent(dir, text) {
	try {
		fs.writeFileSync(dir, text);
	} catch(err) {
		console.log(chalk.red('Writing file failed'));
	}	
}

module.exports = {
	encrypt,
	decrypt
};