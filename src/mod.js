import { rules_accent_color } from './rules/accent_color.js';
import { rules_aspect_ratio } from './rules/aspect_ratio.js';

/**
 * @returns {import('@unocss/core').Preset}
 */
export function preset_one() {
	return {
		name: 'unocss-preset-one',
		rules: [
			...rules_accent_color,
			...rules_aspect_ratio,
		],
	};
}
