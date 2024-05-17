<script lang="ts">
  import type { PageData } from './$types';
  import Header from '$lib/components/header/Header.svelte';

  export let data;
  let user: PageData['user'];
  $: user = data.user;
</script>

<div class="flex min-h-screen">
  <Header {user} />
  <div class="relative h-screen flex-1 overflow-auto">
    <slot />
  </div>
</div>
