// @unocss-include

import { create_uno } from '../test_utils.js';
import { expect, test } from 'vitest';

const should_matches = [
	'top',
	'right',
	'bottom',
	'left',
	'inset',

	'top-0',
	'right-1',
	'bottom-2',
	'left-3',
	'inset-4',

	'top-auto',
	'right-auto',
	'bottom-auto',
	'left-auto',
	'inset-auto',

	'top-inherit',
	'right-initial',
	'bottom-revert',
	'left-revert-layer',
	'inset-unset',
];

const sources = [
	...should_matches,
];

test(__filename, async () => {
	const uno = create_uno();
	const { css } = await uno.generate(sources);

	await expect(css).toMatchFileSnapshot(__filename + '.css');
});
