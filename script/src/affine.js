//encrypt formula = 3a + 7 (mod 26)
//decrypt formula = 9a + 15 (mod 26)
const letter = require('./helper/letter.helper');
const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 
				 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 
				 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

function encrypt(text) {
	return crypt('enc', text)
}

function decrypt(text) {
	return crypt('dec', text)
}

function crypt(action, text) {
	let charArr = Array.from(text);
	for(let i = 0; i < charArr.length; i++) {

		if(!letter.isLetter(charArr[i])) continue;
		
		let key = 0;
		if(letter.isUpper(charArr[i])) {
			const lower = charArr[i].toLowerCase();
			key = letters.indexOf(lower);
			let newKey = substitute(action, key);
			charArr[i] = letters[newKey].toUpperCase();
		} else {
			key = letters.indexOf(charArr[i]);
			let newKey = substitute(action, key);
			charArr[i] = letters[newKey];
		}
	}

	return charArr.join('');
}

function substitute(action, key) {
	if(action === 'enc') {
		return (key * 3 + 7) % 26;
	}

	return (key * 9 + 15) % 26;
}

module.exports = {
	encrypt,
	decrypt
}