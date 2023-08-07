// @unocss-include

import { createUno } from '../test_utils.js';
import { expect, test } from 'vitest';

const should_matches = [
	'aspect-inherit',
	'aspect-auto',
	'aspect-1',
	'aspect-.5',
	'aspect-1/2',
	'aspect-0/2',
];

const should_not_matches = [
	'aspect-2.',
];

const sources = [
	...should_matches,
	...should_not_matches,
];

test(__filename, async () => {
	const uno = createUno();
	const { css, matched } = await uno.generate(sources);

	for (const should_not_match of should_not_matches) {
		expect(matched.has(should_not_match)).toBe(false);
	}

	await expect(css).toMatchFileSnapshot(__filename + '.css');
});
