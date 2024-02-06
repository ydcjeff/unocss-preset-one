import { Preset, Rule } from '@unocss/core';

export type PresetOneOptions = {
	prefix?: string;
};

const NUMBER_RE_SOURCE = /(\d*(?:\.\d+)?)/.source;
const DIRECTION_MAP: Record<string, string> = {
	t: 'top',
	r: 'right',
	b: 'bottom',
	l: 'left',
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

export { preset_one as presetOne };

export function preset_one(opts: PresetOneOptions = {}): Preset {
	const { prefix } = opts;

	return {
		name: 'unocss-preset-one',
		layer: 'one',
		prefix,
		rules: [
			...create_border_rules(),
			...create_transform_rules(),
			// ...create_flex_rules(),
			// ...create_font_rules(),
			// ...create_inset_rules(),
			...create_margin_padding_rules(),
			// ...create_size_rules(),
		],
	};
}

function create_border_rules(): Rule[] {
	return [
		// border-width
		[
			to_regexp(/b(?:order)?-([tlbrxyse]-)?/),
			([, dir, value]) => {
				if (!dir) {
					return to_css_prop('border-width', value);
				}

				// remove trailing dash
				dir = dir.slice(0, -1);
				if (dir === 'x') {
					return to_css_props(
						[`border-left-width`, `border-right-width`],
						value,
					);
				} else if (dir === 'y') {
					return to_css_props(
						[`border-top-width`, `border-bottom-width`],
						value,
					);
				}

				if (dir === 's' || dir === 'e') {
					return to_css_prop(
						`border-inline-${DIRECTION_MAP[dir]}-width`,
						value,
					);
				}

				dir = DIRECTION_MAP[dir];
				if (dir) {
					return to_css_prop(`border-${dir}-width`, value);
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
			([, dir, value]) => {
				if (!dir) {
					return to_css_prop('border-radius', value);
				}

				// remove trailing dash
				dir = dir.slice(0, -1);
				if (dir === 't' || dir === 'b') {
					dir = DIRECTION_MAP[dir];
					return to_css_props(
						[`border-${dir}-left-radius`, `border-${dir}-right-radius`],
						value,
					);
				}
				if (dir === 'l' || dir === 'r') {
					dir = DIRECTION_MAP[dir];
					return to_css_props(
						[`border-top-${dir}-radius`, `border-bottom-${dir}-radius`],
						value,
					);
				}
				if (dir === 's' || dir === 'e') {
					dir = DIRECTION_MAP[dir];
					return to_css_props(
						[`border-start-${dir}-radius`, `border-end-${dir}-radius`],
						value,
					);
				}

				dir = DIRECTION_MAP[dir];
				if (dir) {
					return to_css_prop(`border-${dir}-radius`, value);
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

function create_transform_rules(): Rule[] {
	return [
		[
			to_regexp(/translate-([xy])-/),
			([, dir, value]) => {
				const css_prop = to_css_prop('transform', value);
				if (css_prop) {
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

function create_margin_padding_rules(): Rule[] {
	return [
		[
			to_regexp(/(scroll-)?([mp])([trblxyse])?-/),
			([, scroll = '', margin_or_padding, dir, value]) => {
				margin_or_padding =
					scroll + (margin_or_padding === 'm' ? 'margin' : 'padding');

				if (dir === 'x' || dir === 'y') {
					const keys =
						dir === 'x'
							? [`${margin_or_padding}-left`, `${margin_or_padding}-right`]
							: [`${margin_or_padding}-top`, `${margin_or_padding}-bottom`];
					return to_css_props(keys, value);
				}

				if (dir === 's' || dir === 'e') {
					return to_css_prop(
						`${margin_or_padding}-inline-${DIRECTION_MAP[dir]}`,
						value,
					);
				}

				dir = dir ? DIRECTION_MAP[dir] : '';
				if (dir) {
					dir = '-' + dir;
				}
				return to_css_prop(`${margin_or_padding}${dir}`, value);
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
			([, min_max = '', width_height, value]) => {
				width_height = width_height === 'w' ? 'width' : 'height';
				return to_css_prop(`${min_max}${width_height}`, value);
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

function create_font_rules(): Rule[] {
	return [
		[
			to_regexp('text-'),
			([, value]) => to_css_prop('font-size', value),
			{ autocomplete: ['text-<num>'] },
		],
		[
			to_regexp(/(?:tracking|ls)-/),
			([, value]) => to_css_prop('letter-spacing', value),
			{ autocomplete: ['ls-<num>', 'tracking-<num>'] },
		],
		[
			to_regexp(/(?:lh|leading)-/),
			([, value]) => to_css_prop('line-height', value),
			{ autocomplete: ['lh-<num>', 'leading-<num>'] },
		],
		[
			to_regexp('indent-'),
			([, value]) => to_css_prop('text-indent', value),
			{ autocomplete: ['text-indent-<num>'] },
		],
	];
}

function create_flex_rules(): Rule[] {
	return [
		[to_regexp('basis-'), ([, value]) => to_css_prop('flex-basis', value)],
		[
			to_regexp(/gap-([xy]-)?/),
			([, dir, value]) => {
				if (dir === 'x-') {
					return to_css_prop('column-gap', value);
				}
				if (dir === 'y-') {
					return to_css_prop('row-gap', value);
				}
				return to_css_prop('gap', value);
			},
		],
	];
}

function create_inset_rules(): Rule[] {
	return [
		[
			to_regexp(/inset-([xy]-)?/),
			([, dir, value]) => {
				if (dir === 'x-') {
					return to_css_props(['left', 'right'], value);
				}
				if (dir === 'y-') {
					return to_css_props(['top', 'bottom'], value);
				}
				return to_css_prop('inset', value);
			},
		],
		[
			to_regexp(/(start|end)-/),
			([, key, value]) => to_css_prop(`inset-inline-${key}`, value),
		],
		[
			to_regexp(/(top|right|bottom|left)-/),
			([, key, value]) => to_css_prop(`${key}`, value),
		],
	];
}

function to_regexp(klass: string | RegExp) {
	klass = typeof klass === 'string' ? klass : klass.source;
	return new RegExp(`^${klass}${NUMBER_RE_SOURCE}$`);
}

function to_css_props(keys: string[], value?: string) {
	if (value) {
		const css_props: Record<string, string> = {};
		for (const key of keys) {
			css_props[key] = `${value}rem`;
		}
		return css_props;
	}
}

function to_css_prop(key: string, value?: string) {
	if (value) {
		return { [key]: `${value}rem` };
	}
}
