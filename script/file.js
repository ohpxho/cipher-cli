const cipher = require('./cipher');
const fs = require('fs');

function encryptTxtFileContent(type, dir) {
	let parseTxt = getFileContent(dir);
	let encryptedText = encrypt(type, parseTxt);

	return encryptedText;
}


function getFileContent(dir) {
	return 'lemuel';
}

function encrypt(type, text) {
	switch(type) {
		case 'caesar':
			text = cipher.caesar(text);
			break;
	}

	return text;
}

module.exports = encryptTxtFileContent;