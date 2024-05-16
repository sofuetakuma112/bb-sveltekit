<script>
  import { Button } from '$lib/components/ui/button';
  import { createEventDispatcher } from 'svelte';

  import * as Dialog from '$lib/components/ui/dialog';
  import { goto } from '$app/navigation';

  const dispatch = createEventDispatcher();
</script>

<Dialog.Root>
  <Dialog.Trigger>
    <slot />
  </Dialog.Trigger>
  <Dialog.Content>
    <Dialog.Header>
      <Dialog.Title>本当にログアウトしますか？</Dialog.Title>
    </Dialog.Header>
    <div class="flex justify-center">
      <Button variant="delete" class="m-2" type="submit" on:click={() => goto('/auth/logout')}
        >ログアウト</Button
      >
      <Button variant="close" class="m-2" on:click={() => dispatch('toggle')}>キャンセル</Button>
    </div>
  </Dialog.Content>
</Dialog.Root>

<!-- <Dialog.Root>
  <Dialog.Trigger
    >Edit Profile</Dialog.Trigger
  >
  <Dialog.Content class="sm:max-w-[425px]">
    <Dialog.Header>
      <Dialog.Title>Edit profile</Dialog.Title>
      <Dialog.Description>
        Make changes to your profile here. Click save when you're done.
      </Dialog.Description>
    </Dialog.Header>
    <div class="grid gap-4 py-4">
      <div class="grid grid-cols-4 items-center gap-4">
      </div>
      <div class="grid grid-cols-4 items-center gap-4">
      </div>
    </div>
    <Dialog.Footer>
      <Button type="submit">Save changes</Button>
    </Dialog.Footer>
  </Dialog.Content>
</Dialog.Root> -->
