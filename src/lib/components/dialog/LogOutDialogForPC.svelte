<script>
  import LogOutDialog from './LogOutDialog.svelte';
  import { Button } from '$lib/components/ui/button';
  import { createEventDispatcher } from 'svelte';
  import { cn } from '$lib/utils';
    import LogoutIcon from '$lib/components/icons/LogoutIcon.svelte';
  
  export let className = undefined;
  export { className as class };

  const dispatch = createEventDispatcher();
</script>

<LogOutDialog>
  <Button
    variant="smOutline"
    sp="menubar"
    class={cn('hidden sm:flex', className)}
    on:click={() => dispatch('toggle')}
  >
    <LogoutIcon class="size-8" />
  </Button>
</LogOutDialog>
