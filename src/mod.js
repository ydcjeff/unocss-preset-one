import { rules_accent_color } from './rules/accent_color.js';
import { rules_aspect_ratio } from './rules/aspect_ratio.js';
import { rules_border } from './rules/border.js';

export { preset_one };

/**
 * @returns {import('@unocss/core').Preset}
 */
function preset_one() {
	return {
		name: 'unocss-preset-one',
		rules: [
			...rules_accent_color,
			...rules_aspect_ratio,
			...rules_border,
		],
	};
}
