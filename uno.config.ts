import { preset_one } from './src/mod';
import { UserConfig } from '@unocss/core';
import { presetUno } from '@unocss/preset-uno';

export default {
	presets: [presetUno({ preflight: false }), preset_one()],
} satisfies UserConfig;
