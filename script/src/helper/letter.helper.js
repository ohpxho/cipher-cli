const uppercase = {
	asciiMin: 65,
	asciiMax: 90
};

const lowercase = {
	asciiMin: 97,
	asciiMax: 122
};


function isLetter(letter) {
	const letterAscciCode = letter.charCodeAt(0);
	return (letterAscciCode >= uppercase.asciiMin && letterAscciCode <= uppercase.asciiMax) || (letterAscciCode >= lowercase.asciiMin && letterAscciCode <= lowercase.asciiMax) 
}

function isUpper(letter) {
	return (letter >= uppercase.asciiMin && letter <= uppercase.asciiMax);
} 

module.exports = {
	isLetter,
	isUpper,
	uppercase,
	lowercase
};