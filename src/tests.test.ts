// @unocss-include

import { createGenerator } from '@unocss/core';
import { expect, test } from 'vitest';
import { preset_one } from './mod';
import { format } from 'prettier';
import uno_config from '../uno.config';

test(preset_one.name, async () => {
	const fixtures = [
		// border
		'b-1',
		'b-t-2',
		'b-r-3',
		'b-b-4',
		'b-l-5',
		'b-x-6',
		'b-y-7',
		'b-s-8',
		'b-e-9',
		'border-1',
		'border-t-2',
		'border-r-3',
		'border-b-4',
		'border-l-5',
		'border-x-6',
		'border-y-7',
		'border-s-8',
		'border-e-9',
		'rounded-1',
		'rounded-t-2',
		'rounded-r-3',
		'rounded-b-4',
		'rounded-l-5',
		'rounded-s-6',
		'rounded-e-7',
		'rounded-tl-8',
		'rounded-tr-9',
		'rounded-bl-10',
		'rounded-br-11',
		'rounded-ss-12',
		'rounded-se-13',
		'rounded-ee-14',
		'rounded-es-15',

		// flex
		'basis-1',
		'gap-2',
		'gap-x-3',
		'gap-y-4',

		// font
		'text-1',
		'tracking-2',
		'ls-2',
		'lh-3',
		'leading-3',
		'indent-4',

		// inset
		'inset-1',
		'inset-x-2',
		'inset-y-3',
		'start-4',
		'end-5',
		'top-6',
		'right-7',
		'bottom-8',
		'left-9',

		// transform
		'translate-x-1',
		'translate-y-2',

		// margin
		'm-1',
		'mt-2',
		'mr-3',
		'mb-4',
		'ml-5',
		'mx-6',
		'my-7',
		'ms-8',
		'me-9',
		'scroll-m-1',
		'scroll-mt-2',
		'scroll-mr-3',
		'scroll-mb-4',
		'scroll-ml-5',
		'scroll-mx-6',
		'scroll-my-7',
		'scroll-ms-8',
		'scroll-me-9',

		// padding
		'p-1',
		'pt-2',
		'pr-3',
		'pb-4',
		'pl-5',
		'px-6',
		'py-7',
		'ps-8',
		'pe-9',
		'scroll-p-1',
		'scroll-pt-2',
		'scroll-pr-3',
		'scroll-pb-4',
		'scroll-pl-5',
		'scroll-px-6',
		'scroll-py-7',
		'scroll-ps-8',
		'scroll-pe-9',
	];

	const unocss_generator = createGenerator(uno_config);
	const { css } = await unocss_generator.generate(fixtures);
	const formatted_css = await format(css, {
		parser: 'css',
		useTabs: true,
		singleQuote: true,
	});
	expect(formatted_css).toMatchFileSnapshot(import.meta.filename + '.css');
});
