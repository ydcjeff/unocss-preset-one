import { createGenerator } from '@unocss/core';
import { preset_one } from './mod.js';

export function createUno() {
	return createGenerator({
		presets: [preset_one()],
	});
}
