const upper = {
	asciiMin: 65,
	asciiMax: 90
};

const lower = {
	asciiMin: 97,
	asciiMax: 122
};

const maxShift = 3;

function encrypt(text) {
	let charArr = convertTextToCharArray(text);
	for(let i = 0; i < charArr.length; i++) {
		if(isLetter(charArr[i])) {
			charArr[i] = shiftAsciiCode('enc', charArr[i]);
		}
	}
	
	return charArr.join('');
}

function decrypt(text) {
	let charArr = convertTextToCharArray(text);
	for(let i = 0; i < charArr.length; i++) {
		if(isLetter(charArr[i])) {
			charArr[i] = shiftAsciiCode('dec', charArr[i]);
		}
	}
	
	return charArr.join('');
}

function shiftAsciiCode(action, letter) {
	const letterAscciCode = letter.charCodeAt(0);
	let shiftedVal = 0;
	if(action === 'enc') shiftedVal = letterAscciCode + maxShift;
	else shiftedVal = letterAscciCode - maxShift;

	let remainder = 0;

	if(action === 'enc' && isMaxLimitExceeded(shiftedVal)) {
		if(isUpper(letterAscciCode)) {
			remainder = shiftedVal - upper.asciiMax;
			shiftedVal = (upper.asciiMin - 1) + remainder;
		}else {
			remainder = shiftedVal - lower.asciiMax;
			shiftedVal = (lower.asciiMin - 1) + remainder;
		}
	}

	if(action === 'dec' && isMinLimitExceeded(shiftedVal)) {
		if(isUpper(letterAscciCode)) {
			remainder = upper.asciiMin - shiftedVal;
			shiftedVal = (upper.asciiMax + 1) - remainder;
		}else {
			remainder = lower.asciiMin - shiftedVal;
			shiftedVal = (lower.asciiMax + 1) - remainder;
		}	
	}

	return String.fromCharCode(shiftedVal);
}

function isUpper(letter) {
	return (letter >= upper.asciiMin && letter <= upper.asciiMax);
} 

function isMaxLimitExceeded(code) {
	return (code > upper.asciiMax && code < lower.asciiMin) || (code > lower.asciiMax);  
}

function isMinLimitExceeded(code) {
	return (code < lower.asciiMin && code > upper.asciiMax) || (code < upper.asciiMin);
}

function isLetter(letter) {
	const letterAscciCode = letter.charCodeAt(0);
	return (letterAscciCode >= upper.asciiMin && letterAscciCode <= upper.asciiMax) || (letterAscciCode >= lower.asciiMin && letterAscciCode <= lower.asciiMax) 
}

function convertTextToCharArray(text) {
	return Array.from(text);
}

module.exports = {
	encrypt,
	decrypt
};