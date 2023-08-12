import * as u from '../utils.js';

/** @type {import('@unocss/core').Rule[]} */
export const rules_aspect_ratio = [
	[
		/^aspect-(.+)$/,
		([, value]) => {
			return {
				'aspect-ratio': u.parse_value(value, [
					u.global,
					u.auto,
					u.number,
					u.fraction,
				]),
			};
		},
		{
			autocomplete: [
				`aspect-(${u.GLOBAL_VALUES.join('|')})`,
				`aspect-auto`,
				`aspect-<num>`,
			],
		},
	],
];
