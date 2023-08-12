import { createGenerator } from '@unocss/core';
import { preset_one } from './mod.js';

export { create_uno };

function create_uno() {
	return createGenerator({
		presets: [preset_one()],
	});
}
