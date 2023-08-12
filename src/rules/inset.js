import * as u from '../utils.js';

const INSET_KEYS = [
	'inset',
	'top',
	'right',
	'bottom',
	'left',
];

/** @type {import('@unocss/core').Rule[]} */
export const rules_inset = [
	[
		new RegExp(`^(${INSET_KEYS.join('|')})(?:-(.+))?$`),
		([, key, value]) => {
			return {
				[key]: value ? u.parse_value(value, [u.global, u.auto, u.rem]) : '1px',
			};
		},
		{
			autocomplete: [
				...INSET_KEYS,
				`(${INSET_KEYS.join('|')})-auto`,
				`(${INSET_KEYS.join('|')})-(${u.GLOBAL_VALUES.join('|')})`,
				`(${INSET_KEYS.join('|')})-<num>`,
			],
		},
	],
];
