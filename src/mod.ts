import { Preset, Rule } from '@unocss/core';

export type PresetOneOptions = {
	/**
	 * Prefix for the utilities of this preset.
	 *
	 * @default 'one-'
	 */
	prefix?: string;
};

const NUMBER_RE_SOURCE = /(-?\d*(?:\.\d+)?)/.source;
const DIRECTION_MAP = {
	t: 'top',
	r: 'right',
	b: 'bottom',
	l: 'left',
	x: ['left', 'right'],
	y: ['top', 'bottom'],
	s: 'start',
	e: 'end',
	tl: 'top-left',
	tr: 'top-right',
	bl: 'bottom-left',
	br: 'bottom-right',
	ss: 'start-start',
	se: 'start-end',
	ee: 'end-end',
	es: 'end-start',
};

type Direction = keyof typeof DIRECTION_MAP;

export { preset_one as presetOne };

export function preset_one(opts: PresetOneOptions = {}): Preset {
	const { prefix = 'one-' } = opts;

	return {
		name: 'unocss-preset-one',
		layer: 'one',
		prefix,
		rules: [
			...create_border_rules(),
			...create_flex_rules(),
			...create_font_rules(),
			...create_inset_rules(),
			...create_margin_padding_rules(),
			...create_size_rules(),
			...create_transform_rules(),
		],
	};
}

function create_border_rules(): Rule[] {
	return [
		// border-width
		[
			to_regexp(/b(?:order)?-([tlbrxyse]-)?/),
			([, dir_dash, value]) => {
				if (!dir_dash) {
					return to_css_props('border-width', value);
				}

				// remove trailing dash
				const dir_key = dir_dash.slice(0, -1) as Direction;

				if (dir_key === 's' || dir_key === 'e') {
					return to_css_props(
						`border-inline-${DIRECTION_MAP[dir_key]}-width`,
						value,
					);
				}

				const dirs = DIRECTION_MAP[dir_key];
				if (dirs) {
					return to_css_props(
						Array.isArray(dirs)
							? dirs.map((d) => `border-${d}-width`)
							: `border-${dirs}-width`,
						value,
					);
				}
			},
			{
				autocomplete: [
					'b-<num>',
					'b-t-<num>',
					'b-r-<num>',
					'b-b-<num>',
					'b-l-<num>',
					'b-x-<num>',
					'b-y-<num>',
					'b-s-<num>',
					'b-e-<num>',
					'border-<num>',
					'border-t-<num>',
					'border-r-<num>',
					'border-b-<num>',
					'border-l-<num>',
					'border-x-<num>',
					'border-y-<num>',
					'border-s-<num>',
					'border-e-<num>',
				],
			},
		],
		// border-radius
		[
			to_regexp(/rounded-([trblse]{1,2}-)?/),
			([, dir_dash, value]) => {
				if (!dir_dash) {
					return to_css_props('border-radius', value);
				}

				// remove trailing dash
				const dir_key = dir_dash.slice(0, -1) as Direction;
				const dirs = DIRECTION_MAP[dir_key];
				if (typeof dirs === 'string') {
					let keys: string | string[] = `border-${dirs}-radius`;
					switch (dir_key) {
						case 't':
						case 'b':
							keys = [
								`border-${dirs}-left-radius`,
								`border-${dirs}-right-radius`,
							];
							break;
						case 'l':
						case 'r':
							keys = [
								`border-top-${dirs}-radius`,
								`border-bottom-${dirs}-radius`,
							];
							break;
						case 's':
						case 'e':
							keys = [
								`border-start-${dirs}-radius`,
								`border-end-${dirs}-radius`,
							];
							break;
					}
					return to_css_props(keys, value);
				}
			},
			{
				autocomplete: [
					'rounded-<num>',
					'rounded-t-<num>',
					'rounded-r-<num>',
					'rounded-b-<num>',
					'rounded-l-<num>',
					'rounded-s-<num>',
					'rounded-e-<num>',
					'rounded-tl-<num>',
					'rounded-tr-<num>',
					'rounded-bl-<num>',
					'rounded-br-<num>',
					'rounded-ss-<num>',
					'rounded-se-<num>',
					'rounded-ee-<num>',
					'rounded-es-<num>',
				],
			},
		],
	];
}

function create_flex_rules(): Rule[] {
	return [
		[
			to_regexp('basis-'),
			([, value]) => to_css_props('flex-basis', value),
			{ autocomplete: 'basis-<num>' },
		],
		[
			to_regexp(/gap-([xy]-)?/),
			([, dir, value]) => {
				if (dir === 'x-') {
					return to_css_props('column-gap', value);
				}
				if (dir === 'y-') {
					return to_css_props('row-gap', value);
				}
				return to_css_props('gap', value);
			},
			{ autocomplete: ['gap-<num>', 'gap-x-<num>', 'gap-y-<num>'] },
		],
	];
}

function create_font_rules(): Rule[] {
	return [
		[
			to_regexp('text-'),
			([, value]) => to_css_props('font-size', value),
			{ autocomplete: ['text-<num>'] },
		],
		[
			to_regexp(/(?:tracking|ls)-/),
			([, value]) => to_css_props('letter-spacing', value),
			{ autocomplete: ['ls-<num>', 'tracking-<num>'] },
		],
		[
			to_regexp(/(?:lh|leading)-/),
			([, value]) => to_css_props('line-height', value),
			{ autocomplete: ['lh-<num>', 'leading-<num>'] },
		],
		[
			to_regexp('indent-'),
			([, value]) => to_css_props('text-indent', value),
			{ autocomplete: ['text-indent-<num>'] },
		],
	];
}

function create_inset_rules(): Rule[] {
	return [
		[
			to_regexp(/inset-([xy]-)?/),
			([, dir_dash = '', value]) => {
				const dir_key = dir_dash.slice(0, -1) as Direction;
				const dirs = DIRECTION_MAP[dir_key] || 'inset';
				return to_css_props(dirs, value);
			},
			{ autocomplete: ['inset-<num>', 'inset-x-<num>', 'inset-y-<num>'] },
		],
		[
			to_regexp(/(start|end)-/),
			([, key, value]) => to_css_props(`inset-inline-${key}`, value),
			{ autocomplete: ['start-<num>', 'end-<num>'] },
		],
		[
			to_regexp(/(top|right|bottom|left)-/),
			([, key, value]) => to_css_props(`${key}`, value),
			{
				autocomplete: [
					'top-<num>',
					'right-<num>',
					'bottom-<num>',
					'left-<num>',
				],
			},
		],
	];
}

function create_margin_padding_rules(): Rule[] {
	return [
		[
			to_regexp(/(scroll-)?([mp])([trblxyse])?-/),
			([, scroll = '', margin_or_padding, dir = '', value]) => {
				margin_or_padding =
					scroll + (margin_or_padding === 'm' ? 'margin' : 'padding');

				const dirs = DIRECTION_MAP[dir as Direction];
				if (dir === 's' || dir === 'e') {
					return to_css_props(`${margin_or_padding}-inline-${dirs}`, value);
				}

				const keys = Array.isArray(dirs)
					? dirs.map((d) => `${margin_or_padding}-${d}`)
					: `${margin_or_padding}${dirs ? `-${dirs}` : ''}`;

				return to_css_props(keys, value);
			},
			{
				autocomplete: [
					'm-<num>',
					'mt-<num>',
					'mr-<num>',
					'mb-<num>',
					'ml-<num>',
					'mx-<num>',
					'my-<num>',
					'ms-<num>',
					'me-<num>',

					'scroll-m-<num>',
					'scroll-mt-<num>',
					'scroll-mr-<num>',
					'scroll-mb-<num>',
					'scroll-ml-<num>',
					'scroll-mx-<num>',
					'scroll-my-<num>',
					'scroll-ms-<num>',
					'scroll-me-<num>',

					'p-<num>',
					'pt-<num>',
					'pr-<num>',
					'pb-<num>',
					'pl-<num>',
					'px-<num>',
					'py-<num>',
					'ps-<num>',
					'pe-<num>',

					'scroll-p-<num>',
					'scroll-pt-<num>',
					'scroll-pr-<num>',
					'scroll-pb-<num>',
					'scroll-pl-<num>',
					'scroll-px-<num>',
					'scroll-py-<num>',
					'scroll-ps-<num>',
					'scroll-pe-<num>',
				],
			},
		],
	];
}

function create_size_rules(): Rule[] {
	return [
		[
			to_regexp(/(min-|max-)?(w|h)-/),
			([, min_max = '', width_or_height, value]) => {
				width_or_height = width_or_height === 'w' ? 'width' : 'height';
				return to_css_props(`${min_max}${width_or_height}`, value);
			},
			{
				autocomplete: [
					'w-<num>',
					'min-w-<num>',
					'max-w-<num>',

					'h-<num>',
					'min-h-<num>',
					'max-h-<num>',
				],
			},
		],
		[
			to_regexp('size-'),
			([, value]) => to_css_props(['height', 'width'], value),
			{ autocomplete: ['size-<num>'] },
		],
	];
}

function create_transform_rules(): Rule[] {
	return [
		[
			to_regexp(/translate-([xy])-/),
			([, dir, value]) => {
				const css_prop = to_css_props('transform', value);
				if (dir && css_prop) {
					css_prop.transform = `translate${dir.toUpperCase()}(${css_prop.transform})`;
					return css_prop;
				}
			},
			{
				autocomplete: ['translate-x-<num>', 'translate-y-<num>'],
			},
		],
	];
}

function to_regexp(klass: string | RegExp) {
	klass = typeof klass === 'string' ? klass : klass.source;
	return new RegExp(`^${klass}${NUMBER_RE_SOURCE}$`);
}

function to_css_props(keys: string | string[], value?: string) {
	if (value) {
		if (Array.isArray(keys)) {
			const css_props: Record<string, string> = {};
			for (const key of keys) {
				css_props[key] = `${value}rem`;
			}
			return css_props;
		}
		return { [keys]: `${value}rem` };
	}
}
