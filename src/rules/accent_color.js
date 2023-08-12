import * as u from '../utils.js';

/** @type {import('@unocss/core').Rule[]} */
export const rules_accent_color = [
	[
		/^accent-(.+)$/,
		([, value]) => {
			return {
				'accent-color': u.parse_value(value, [u.global, u.auto, u.any]),
			};
		},
		{
			autocomplete: [
				`accent-auto`,
				`accent-(${u.GLOBAL_VALUES.join('|')})`,
			],
		},
	],
];
