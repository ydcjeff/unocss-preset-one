// @unocss-include

import { create_uno } from '../test_utils.js';
import { expect, test } from 'vitest';

const should_matches = [
	// border-width
	'border',
	'border-t',
	'border-r',
	'border-b',
	'border-l',
	'border-x',
	'border-y',

	'border-0',
	'border-1',
	'border-t-1',
	'border-r-1',
	'border-b-1',
	'border-l-1',
	'border-x-1',
	'border-y-1',

	'border-.5',
	'border-t-.5',
	'border-r-.5',
	'border-b-.5',
	'border-l-.5',
	'border-x-.5',
	'border-y-.5',

	// border-style
	'border-dotted',
	'border-t-dashed',
	'border-r-dotted',
	'border-b-double',
	'border-l-groove',
	'border-x-hidden',
	'border-y-inset',

	// border-radius
	'rounded',
	'rounded-t',
	'rounded-r',
	'rounded-b',
	'rounded-l',
	'rounded-tr',
	'rounded-br',
	'rounded-bl',
	'rounded-tl',
];

const sources = [
	...should_matches,
];

test(__filename, async () => {
	const uno = create_uno();
	const { css } = await uno.generate(sources);

	await expect(css).toMatchFileSnapshot(__filename + '.css');
});
