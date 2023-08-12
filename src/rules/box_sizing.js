import * as u from '../utils.js';

/** @type {import('@unocss/core').Rule[]} */
export const rules_box_sizing = [
	[
		'box-border',
		{ 'box-sizing': 'border-box' },
	],
	[
		'box-content',
		{ 'box-sizing': 'content-box' },
	],
	...u.GLOBAL_VALUES.map((
		v,
	) => /** @type {import('@unocss/core').StaticRule} */ ([`box-${v}`, {
		'box-sizing': v,
	}])),
];
