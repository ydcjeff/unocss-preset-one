import { createValueHandler } from '@unocss/core';

export const global_values = [
	'inherit',
	'initial',
	'revert',
	'revert-layer',
	'unset',
];

const NUMBER_RE = /^\d*(?:\.\d+)?$/;

export const handler = createValueHandler({
	auto(s) {
		if (s === 'auto') {
			return s;
		}
	},
	any(s) {
		return s;
	},
	global(s) {
		if (global_values.includes(s)) {
			return s;
		}
	},
	fraction(s) {
		const [numerator, denominator] = s.split('/', 2);
		const res = Number.parseFloat(numerator) / Number.parseFloat(denominator);
		if (!Number.isNaN(res)) {
			if (res === 0) {
				return '0';
			}
			return s;
		}
	},
	number(s) {
		if (NUMBER_RE.test(s)) {
			return +s;
		}
	},
});
