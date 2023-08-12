// @unocss-include

import { expect, test } from 'vitest';
import { create_uno } from '../test_utils.js';

const sources = [
	'accent-initial',
	'accent-auto',
	'accent-darkred',
	'accent-#fff',
];

test(__filename, async () => {
	const uno = create_uno();
	const { css } = await uno.generate(sources);
	await expect(css).toMatchFileSnapshot(__filename + '.css');
});
