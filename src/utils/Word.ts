export default class Word {
	static count(string: string = '') {
		string = string.replace(/\s{2,}/g, ' ').trim(); // Remove double spaces
		string = string.replace(/-/g, ' ').trim(); // Convert hyphens to spaces
		string = string.replace(/'/g, ' ').trim(); // Convert apostrophes to spaces
		const words = string.split(' ')
			.filter(item => item.replace(/[^a-zA-Z]/gi, '') !== '');
		return string === '' ? 0 : words.length;
	}

	static getSeparators(): Array<string> {
		return ' !@#$%*(){}[]\\|;:"\',<.>/?¡¿'.split('');
	}

	static cleanWords(string) {
		string = string.replace(/\s{2,}/g, ' ') // Remove double spaces
			.replace(/[!@#$%*(){}\[\]\|;:"',<.>\/?¡¿]/gi, ' ') // Remove separators
			.trim();
		return string.split(' ');
	}
}
