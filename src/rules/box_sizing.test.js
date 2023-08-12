// @unocss-include

import { create_uno } from '../test_utils.js';
import { expect, test } from 'vitest';

const sources = [
	'box-border',
	'box-content',
	'box-inherit',
];

test(__filename, async () => {
	const uno = create_uno();
	const { css } = await uno.generate(sources);

	await expect(css).toMatchFileSnapshot(__filename + '.css');
});
