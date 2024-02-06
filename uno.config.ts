import { preset_one } from './src/mod.js';
import { UserConfig } from '@unocss/core';
import { presetUno } from '@unocss/preset-uno';

const config: UserConfig = {
	presets: [
		presetUno({
			preflight: false,
		}),
		preset_one({
			prefix: '',
		}),
	],
};

export default config;
