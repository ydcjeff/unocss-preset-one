import * as u from '../utils.js';

const BORDER_STYLES = [
	'none',
	'hidden',
	'dotted',
	'dashed',
	'solid',
	'double',
	'groove',
	'ridge',
	'inset',
	'outset',
	...u.GLOBAL_VALUES,
];

/** @type {import('@unocss/core').Rule[]} */
export const rules_border = [
	[
		/^border(?:-([trblxy]))?(?:-(.+))?$/,
		([, direction = '', value]) => {
			const dirs = u.DIRECTION_MAP[direction];
			return Object.fromEntries(dirs.map((d = '') => {
				return [
					`border${d}-width`,
					value ? u.parse_value(value, [u.rem]) : '1px',
				];
			}));
		},
		{
			autocomplete: [
				`border`,
				`border-<num>`,
				`border-<directions>-<num>`,
			],
		},
	],

	[
		/^border(?:-([trblxy]))?-(.+)$/,
		([, direction = '', style]) => {
			if (BORDER_STYLES.includes(style)) {
				const dirs = u.DIRECTION_MAP[direction];
				return Object.fromEntries(dirs.map((d = '') => {
					return [`border${d}-style`, style];
				}));
			}
		},
		{
			autocomplete: [
				`border-(${BORDER_STYLES.join('|')})`,
				`border-<directions>-(${BORDER_STYLES.join('|')})`,
			],
		},
	],

	[
		/^rounded(?:-([trbl]))?(?:-(.+))?$/,
		([, direction = '', value]) => {
			const dirs = u.RADIUS_MAP[direction];
			return Object.fromEntries(dirs.map((d = '') => {
				return [
					`border${d}-radius`,
					value ? u.parse_value(value, u.rem) : '1px',
				];
			}));
		},
		{
			autocomplete: [
				`rounded`,
				`rounded-(t|r|b|l)`,
				`rounded-<num>`,
				`rounded-(t|r|b|l)-<num>`,
			],
		},
	],

	[
		/^rounded(?:-([trbl]{2}))(?:-(.+))?$/,
		([, direction = '', value]) => {
			const dirs = u.RADIUS_MAP[direction];
			return Object.fromEntries(dirs.map((d = '') => {
				return [
					`border${d}-radius`,
					value ? u.parse_value(value, u.rem) : '1px',
				];
			}));
		},
		{
			autocomplete: [
				`rounded-(tr|br|bl|tl)`,
				`rounded-(tr|br|bl|tl)-<num>`,
			],
		},
	],
];
