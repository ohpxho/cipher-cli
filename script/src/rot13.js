const letter = require('./helper/letter.helper');
const LIMIT = 13;

function encrypt(text) {
	return crypt('enc', text);
}

function decrypt(text) {
	return crypt('dec', text);
}

function crypt(action, text) {
	let charArr = Array.from(text);
	for(let i = 0; i < charArr.length; i++) {
		let letterAsciiCode = charArr[i].charCodeAt(0);
		
		if(!letter.isLetter(charArr[i])) continue;

		if(isGreaterThanLimit(charArr[i])) {
			letterAsciiCode -= LIMIT;
			charArr[i] = String.fromCharCode(letterAsciiCode);
			continue;
		}

		letterAsciiCode += LIMIT;
		charArr[i] = String.fromCharCode(letterAsciiCode);
	}

	return charArr.join('');
}

function isGreaterThanLimit(_letter) {
	const letterAsciiCode = _letter.charCodeAt(0);
	if(letter.isUpper(_letter)) {
		return (letterAsciiCode > letter.uppercase.asciiMin + LIMIT);	
	}
	return (letterAsciiCode > letter.lowercase.asciiMin + LIMIT); 
}

module.exports = {
	encrypt,
	decrypt
}