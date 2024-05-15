<script lang="ts">
  import type { PageData } from './$types';
  import Navigation from '$lib/components/navigation/navigation.svelte';
  import Header from '$lib/components/header/Header.svelte';

  export let data;
  let user: PageData['user'];
  $: user = data.user;
</script>

<Header {user} />
<div class="relative h-screen flex-1 overflow-auto">
  <slot />
</div>
