<script lang="ts">
	import type { PageData } from './$types';
	import './styles.css';
	import { ModeWatcher } from 'mode-watcher';
	import Navigation from '$lib/components/navigation/navigation.svelte';

	export let data: any;
	let user: PageData['user'];
	$: user = data.user;
</script>

<ModeWatcher />
<div class="relative flex min-h-screen flex-col">
	<!-- <Navigation {user} /> -->
	<slot />
</div>
