import { DirectusManyModel } from "../models/DirectusModel";

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

	static getExcerpt(string: string = '', limit: number = 250) {
		let result = '';
		const words = string.replace(/\s{2,}/g, ' ').trim().split(' ');
		for (let i = 0; i < words.length; i++) {
			const word = words[i];
			if (result.length + word.length <= limit) {
				result += word + ' ';
			}
			if (result.length - 1 >= limit) {
				if (i < words.length - 1) {
					result += ' […]';
				}
				break;
			}
		}
		return result;
	}

	static getReadTime(string: string = '', wpm: number = 200) {
		const totalWords = this.count(string);
		return Math.ceil(totalWords / wpm);
	}

	static getFormattedValue(value: string, bookmarks: DirectusManyModel = new DirectusManyModel()) {
		let result = '';
		const paragraphs = value.split('\n\n');
		paragraphs.forEach(paragraph => {
			const words = paragraph.split(' ');
			let entry = '<p>';
			words.forEach(word => {
				entry += !bookmarks.data.find(bookmark => bookmark.value === word)
					? word + ' '
					: '<span class="bookmark">' + word + '</span> ';
			});
			result += entry.substring(0, entry.length - 1) + '</p>';
		});
		return result;
	}
}
