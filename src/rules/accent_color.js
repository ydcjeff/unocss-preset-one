import { global_values, handler } from '../utils.js';

/** @type {import('@unocss/core').Rule[]} */
export const rules_accent_color = [
	[
		/^accent-(.+)$/,
		([, value]) => {
			return { 'accent-color': handler.global.auto.any(value) };
		},
		{
			autocomplete: [
				`accent-auto`,
				`accent-(${global_values.join('|')})`,
			],
		},
	],
];
