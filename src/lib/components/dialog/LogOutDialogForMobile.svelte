<script>
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();
</script>

<button
  class="mx-auto inline-block text-sm sm:hidden py-2"
  on:click={() => dispatch('openLogoutDialog')}>ログアウトする</button
>
