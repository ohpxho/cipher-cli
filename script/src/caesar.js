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
			charArr[i] = shiftAsciiCode(charArr[i]);
		}
	}
	
	return charArr.join('');
}

function shiftAsciiCode(letter) {
	const letterAscciCode = letter.charCodeAt(0);
	let shiftedVal = letterAscciCode + maxShift;
	if(isLimitExceeded(shiftedVal)) {
		let remainder = 0;
		if(isUpper(letterAscciCode)) {
			remainder = shiftedVal - upper.asciiMax;
			shiftedVal = (upper.asciiMin - 1) + remainder;
		}else {
			remainder = shiftedVal - lower.asciiMax;
			shiftedVal = (lower.asciiMin - 1) + remainder;
		}
	}

	return String.fromCharCode(shiftedVal);
}

function isUpper(letter) {
	return (letter >= upper.asciiMin && letter <= upper.asciiMax);
} 

function isLimitExceeded(code) {
	return (code > upper.asciiMax && code < lower.asciiMin) || (code > lower.asciiMax)  
}

function isLetter(letter) {
	const letterAscciCode = letter.charCodeAt(0);
	return (letterAscciCode >= upper.asciiMin && letterAscciCode <= upper.asciiMax) || (letterAscciCode >= lower.asciiMin && letterAscciCode <= lower.asciiMax) 
}

function convertTextToCharArray(text) {
	return Array.from(text);
}

module.exports = encrypt;