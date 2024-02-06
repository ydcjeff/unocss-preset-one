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
