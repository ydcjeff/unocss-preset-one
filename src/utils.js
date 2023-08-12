export {
	any,
	auto,
	DIRECTION_MAP,
	fraction,
	global,
	GLOBAL_VALUES,
	number,
	parse_value,
	RADIUS_MAP,
	rem,
};

const NUMBER_RE = /^\d*(?:\.\d+)?$/;
const FRACTION_RE = /^[1-9]\d*\/[1-9]\d*$/;
const GLOBAL_VALUES = [
	'inherit',
	'initial',
	'revert',
	'revert-layer',
	'unset',
];
/** @type {Record<string, string[]>} */
const DIRECTION_MAP = {
	t: ['-top'],
	r: ['-right'],
	b: ['-bottom'],
	l: ['-left'],
	'': [''],
	x: ['-top', '-bottom'],
	y: ['-left', '-right'],
};
/** @type {Record<string, string[]>} */
const RADIUS_MAP = {
	t: ['-top-left', '-top-right'],
	r: ['-top-right', '-bottom-right'],
	b: ['-bottom-left', '-bottom-right'],
	l: ['-top-left', '-bottom-left'],
	'': [''],
	tr: ['-top-right'],
	br: ['-bottom-right'],
	bl: ['-bottom-left'],
	tl: ['-top-left'],
};

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
	if (FRACTION_RE.test(s)) {
		return s;
	}
}

/** @type {Handler} */
function rem(s) {
	const n = number(s);
	if (n != null) {
		if (+n === 0) {
			return 0;
		}
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
