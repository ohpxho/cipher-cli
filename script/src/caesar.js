const letter = require('./helper/letter.helper');
const maxShift = 3;

function encrypt(text) {
	return crypt('enc', text);
}

function decrypt(text) {
	return crypt('dec', text);
}

function crypt(action, text) {
	let charArr = Array.from(text);
	for(let i = 0; i < charArr.length; i++) {
		if(letter.isLetter(charArr[i])) {
			charArr[i] = shiftAsciiCode(action, charArr[i]);
		}
	}
	
	return charArr.join('');
}


function shiftAsciiCode(action, _letter) {
	const letterAscciCode = _letter.charCodeAt(0);
	let shiftedVal = 0;
	if(action === 'enc') shiftedVal = letterAscciCode + maxShift;
	else shiftedVal = letterAscciCode - maxShift;

	let remainder = 0;

	if(action === 'enc' && isMaxLimitExceeded(shiftedVal)) {
		if(letter.isUpper(letterAscciCode)) {
			remainder = shiftedVal - letter.uppercase.asciiMax;
			shiftedVal = (letter.uppercase.asciiMin - 1) + remainder;
		}else {
			remainder = shiftedVal - letter.lowercase.asciiMax;
			shiftedVal = (letter.lowercase.asciiMin - 1) + remainder;
		}
	}

	if(action === 'dec' && isMinLimitExceeded(shiftedVal)) {
		if(letter.isUpper(letterAscciCode)) {
			remainder = letter.uppercase.asciiMin - shiftedVal;
			shiftedVal = (letter.uppercase.asciiMax + 1) - remainder;
		}else {
			remainder = letter.lowercase.asciiMin - shiftedVal;
			shiftedVal = (letter.lowercase.asciiMax + 1) - remainder;
		}	
	}

	return String.fromCharCode(shiftedVal);
} 

function isMaxLimitExceeded(code) {
	return (code > letter.uppercase.asciiMax && code < letter.lowercase.asciiMin) || (code > letter.lowercase.asciiMax);  
}

function isMinLimitExceeded(code) {
	return (code < letter.lowercase.asciiMin && code > letter.uppercase.asciiMax) || (code < letter.uppercase.asciiMin);
}

module.exports = {
	encrypt,
	decrypt
};