<a href="https://www.npmjs.com/package/unocss-preset-one" target="_blank">
	<img src="https://img.shields.io/npm/v/unocss-preset-one">
</a>

# unocss-preset-one

> `1` to `1rem` UnoCSS preset.

When you write `1`, it will generate `1rem`. That's it.

See why on https://github.com/tailwindlabs/tailwindcss/discussions/11439.

## Docs

```sh
pnpm add unocss-preset-one -D
```

### Usage

This preset is an opt-in preset if using the default preset options. Otherwise,
this preset must come last if you want to omit `prefix`.

```ts
// uno.config.js
import { presetUno, defineConfig } from 'unocss';
import { presetOne } from 'unocss-preset-one';

export default defineConfig({
	presets: [
		presetUno(),
		// must come last to take precedence if omit prefix, otherwise any order.
		presetOne({ prefix: '' }),
	],
});
```

<table>
<thead>
<tr style="text-align: center">
<th>With prefix</th>
<th>Without prefix</th>
</tr>
</thead>
<tbody>
<tr>
<td>

```html
<div class="one-p-1 one-text-2">
	The classes `one-p-1` and `one-text-2` will generate `padding: 1rem` and
	`font-size: 2rem` respectively.
</div>
```

</td>

<td>

```html
<div class="p-1 text-2">
	The classes `p-1` and `text-2` will generate `padding: 1rem` and `font-size:
	2rem` respectively.
</div>
```

</td>
</tr>
</tbody>
</table>

### Types

```ts
export interface PresetOneOptions {
	/**
	 * Prefix for the utilities of this preset.
	 *
	 * @default 'one-'
	 */
	prefix?: string;
}
```

## License

[MIT](./LICENSE)
