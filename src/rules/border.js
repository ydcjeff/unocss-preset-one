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
				`border-(${u.DIRECTION_KEYS.join('|')})-<num>`,
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
				`border-(${u.DIRECTION_KEYS.join('|')})-(${BORDER_STYLES.join('|')})`,
			],
		},
	],

	[
		/^rounded(?:-([trbl]))?(?:-(.+))?$/,
		([, radius = '', value]) => {
			const radii = u.RADIUS_MAP[radius];
			return Object.fromEntries(radii.map((d = '') => {
				return [
					`border${d}-radius`,
					value ? u.parse_value(value, u.rem) : '1px',
				];
			}));
		},
		{
			autocomplete: [
				`rounded`,
				`rounded-(${u.RADIUS_KEYS.join('|')})`,
				`rounded-<num>`,
				`rounded-(${u.RADIUS_KEYS.join('|')})-<num>`,
			],
		},
	],

	[
		/^rounded(?:-([trbl]{2}))(?:-(.+))?$/,
		([, radius = '', value]) => {
			const radii = u.RADIUS_MAP[radius];
			return Object.fromEntries(radii.map((d = '') => {
				return [
					`border${d}-radius`,
					value ? u.parse_value(value, u.rem) : '1px',
				];
			}));
		},
		{
			autocomplete: [
				`rounded-(${u.RADIUS_KEYS.join('|')})`,
				`rounded-(${u.RADIUS_KEYS.join('|')})-<num>`,
			],
		},
	],
];
