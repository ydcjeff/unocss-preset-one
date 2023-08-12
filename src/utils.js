export { auto, any, global, fraction, number, rem, parse_value, GLOBAL_VALUES };

const NUMBER_RE = /^\d*(?:\.\d+)?$/;
const GLOBAL_VALUES = [
	'inherit',
	'initial',
	'revert',
	'revert-layer',
	'unset',
];

/** @type {Handler} */
function auto(s) {
	if (s === 'auto') {
		return s;
	}
}

/** @type {Handler} */
function any(s) {
	return s;
}

/** @type {Handler} */
function global(s) {
	if (GLOBAL_VALUES.includes(s)) {
		return s;
	}
}

/** @type {Handler} */
function fraction(s) {
	const [numerator, denominator] = s.split('/', 2);
	const res = Number.parseFloat(numerator) / Number.parseFloat(denominator);
	if (!Number.isNaN(res)) {
		if (res === 0) {
			return '0';
		}
		return s;
	}
}

/** @type {Handler} */
function rem(s) {
	const n = number(s);
	if (n != null) {
		return n + 'rem';
	}
}

/** @type {Handler} */
function number(s) {
	if (NUMBER_RE.test(s)) {
		return +s;
	}
}

/**
 * @param {string} value
 * @param {Handler[] | Handler} handlers
 */
function parse_value(value, handlers) {
	handlers = Array.isArray(handlers) ? handlers : [handlers];

	for (const h of handlers) {
		const res = h(value);
		if (res != null) {
			return res;
		}
	}
}

/**
 * @typedef {(s: string) => string | number | undefined} Handler
 */
