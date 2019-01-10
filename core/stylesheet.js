import CSSTransformer from './css-transformer';
import { printErr, camelCaseToDash } from './functions';

export default class StyleSheet
{
	constructor() {
		this.element = this._createElement();
	}

	get isStyleSheet() {
		return true;
	}

	_createElement() {
		if (document.createStyleSheet) {
			return document.createStyleSheet();

		} else {
			const head = document.getElementsByTagName('head')[0];
			const style = document.createElement('style');

			head.appendChild(style);

			return document.styleSheets[document.styleSheets.length - 1];
		}
	}

	_getLastIndex() {
		return this.element.cssRules.length;
	}

	add() {
		if (arguments.length > 1) {
			const [ rule, styles ] = arguments;
			this._add(rule, styles);

		} else if (Array.isArray(arguments[0])) {
			arguments[0].forEach((styles) => {
				const { rule } = styles;
				this._add(rule, style);
			});
		}
	}

	_add(rule, styles) {
		if (typeof rule !== 'string') {
			printErr(`rule "${rule}" argument must be a string`);
			return;

		} else if (typeof styles !== 'object') {
			printErr(`styles "${styles}" argument must be an object`);
			return;
		}

		const strRule = StyleSheet.serialize(rule, styles);
		const index = this._getLastIndex();

		this.element.insertRule(strRule, index);

		return index;
	}

	keyFrames(name, keyFrames) {
		if (!Array.isArray(keyFrames) || keyFrames.length < 2) {
			printErr('keyframes must be an array with more than 1 elements');
			return;
		}

		const index = this._getLastIndex();
		const keyCounts = keyFrames.length;
		const rule = '@keyframes ' + name;

		let styles = '';
		keyFrames.forEach((keyFrame, i) => {
			const { offset = i / keyCounts } = keyFrame;
			styles += StyleSheet.serialize((offset * 100) + '%', keyFrame);
		});

		this.element.insertRule(`${rule} {${styles}}`, index);

		return index;
	}

	media(request, arrStyles) {
		if (typeof request !== 'object') {
			printErr('media request must be an object');
			return;
		}

		const mediaRule = this._buildMediaRule(request);
		const index = this._getLastIndex();

		this.element.insertRule(`${mediaRule} {}`, index);

		const media = new Media(this.element, index);

		if (Array.isArray(arrStyles)) {
			arrStyles.forEach((styles) => {
				const { rule } = styles;
				media.add(rule, styles);
			});
		}

		return media;
	}

	_buildMediaRule(request) {
		const { only } = request;

		let rule = '@media';
		let first = true;

		if (only) {
			rule += ' only';
			request.only = null;
		}

		for (let name in request) {
			const value = request[name];
			if (!value) continue;

			const option = camelCaseToDash(name);

			rule += first ? ' ' : ' and ';

			if (typeof value == 'boolean') {
				rule += option;
			} else if (typeof value == 'number') {
				rule += `(${option}:${value}px)`;
			} else {
				rule += `(${option}:${value})`;
			}

			first = false;
		}

		return rule;
	}

	remove(rule) {
		const index = rule.isMedia ? rule.index : rule;
		this.element.deleteRule(index);
	}

	static serialize(rule, styles) {
		let str = rule + '{';

		for (const name in styles) {
			if (name === 'rule') continue;

			let value = styles[name];
			if (name === 'transform' && typeof value == 'object') {
				value = CSSTransformer.serialize(value);
			}

			str += `${name}:${value};`;
		}

		return str + '}';
	}
}

class Media
{
	constructor(parent, index) {
		this._media = parent.cssRules[index];
		this._rules = this._media.cssRules;
		this.index = index;
	}

	get isMedia() {
		return true;
	}

	add(rule, styles) {
		const index = this._rules.length;
		const strRule = StyleSheet.serialize(rule, styles);

		this._media.insertRule(strRule, index);

		return index;
	}

	remove(index) {
		this._media.deleteRule(index);
	}

	clear() {
		for (let i = 0; i < this._rules.length; i++) {
			this._media.deleteRule(i)
		}
	}
}