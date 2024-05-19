<script lang="ts">
  import type { LayoutData } from './$types';
  import Header from '$lib/components/header/Header.svelte';

  export let data: LayoutData;
  let user: LayoutData['user'];
  $: user = data.user;
</script>

<svelte:head>
  <title>BeauBelle</title>
</svelte:head>
<div class="flex h-svh sm:min-h-screen">
  <Header {user} />
  <div class="relative flex-1 overflow-auto">
    <slot />
  </div>
</div>
