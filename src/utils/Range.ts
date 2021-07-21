import Word from './Word';

let rangy: any;
const appliers = {};
const getApplier = (tagName: string, name: string) => {
	const slug = tagName + '_' + name;
	return appliers[slug] ? appliers[slug] : rangy.createClassApplier(name, {
		elementTagName: tagName,
		normalize: true,
	});
};

export default class Range {

	private static rangy: any;

	static init(): Promise<any> {
		return import("rangy").then(RangyModule => {
			this.rangy = RangyModule.default;
			this.rangy.init();
			return rangy;
		});
	}

	static highlightItems(
		container: HTMLElement,
		items: Array<string> = [],
		tagName: string,
		className: string,
		full: boolean = false
	) {
		const selection = this.rangy.saveSelection();
		const range = full ? this.rangy.createRange() : this.rangy.getSelection().getRangeAt(0);

		if (!full) {
			range.moveStart('word', -1);
			range.moveEnd('word', 1);
		} else {
			range.selectNodeContents(container);
		}

		const originalRange = range.cloneRange();
		const searchScopeRange = range.cloneRange();
		const options = {
			caseSensitive: false,
			wholeWordsOnly: true,
			withinRange: searchScopeRange,
		};

		const itemApplier = getApplier(tagName, className);
		itemApplier.undoToRange(range);

		const words = Word.cleanWords(range.toString() || '');
		const _items = items.filter(item => words.indexOf(item.toLowerCase()) !== -1);
		_items.forEach((item, itemIdx) => {

			if (!full && itemIdx > 0) {
				range.setStart(originalRange.startContainer, originalRange.startOffset < 0 ? 0 : originalRange.startOffset);
				range.setEnd(originalRange.endContainer, originalRange.endOffset > originalRange.endContainer.length ? originalRange.endContainer.length : originalRange.endOffset);
			}

			while (range.findText(item, options)) {
				itemApplier.applyToRange(range);
				range.collapse(false);
				if (!full) {
					break;
				}
			}
		});

		this.rangy.restoreSelection(selection);
	}
}
