<script>
  import LogOutDialog from './LogOutDialog.svelte';
  import { Button } from '$lib/components/ui/button';
  export let className = '';
</script>

<LogOutDialog>
  <div name="toggle">
    <Button
      variant="smOutline"
      sp="menubar"
      class={`hidden sm:flex ${className}`}
      on:click={toggle}
    >
      <!-- <Icon name="logout" width="32" height="32" /> -->
      <iconify-icon icon="material-symbols:logout"></iconify-icon>
    </Button>
  </div>
</LogOutDialog>
