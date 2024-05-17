<script>
  import LogOutDialog from './LogOutDialog.svelte';
  import { Button } from '$lib/components/ui/button';
  import { createEventDispatcher } from 'svelte';
  import { cn } from '@/utils';
  
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
    <span class="i-ic-baseline-logout size-8"></span>
  </Button>
</LogOutDialog>
