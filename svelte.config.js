import adapter from '@sveltejs/adapter-cloudflare';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		// adapter-autoがサポートしているのは一部の環境のみです。一覧はhttps://kit.svelte.dev/docs/adapter-auto
		// もしあなたの環境がサポートされていなかったり、特定の環境に落ち着いた場合は、アダプターを交換してください。
		// アダプターの詳細については、https://kit.svelte.dev/docs/adapters を参照
		adapter: adapter(),
		alias: {
			'$lib/*': './src/lib/*'
		}
	}
};

export default config;
