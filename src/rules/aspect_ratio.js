import { global_values, handler } from '../utils.js';

/** @type {import('@unocss/core').Rule[]} */
export const rules_aspect_ratio = [
	[
		/^aspect-(.+)$/,
		([, value]) => {
			return { 'aspect-ratio': handler.global.auto.number.fraction(value) };
		},
		{
			autocomplete: [
				`aspect-(${global_values.join('|')})`,
				`aspect-auto`,
				`aspect-<num>`,
			],
		},
	],
];
