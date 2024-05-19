<script>
  import { Button } from '$lib/components/ui/button';

  import * as Dialog from '$lib/components/ui/dialog';
  import { enhance } from '$app/forms';

  let dialogOpen = false;
  // const handleOpen = () => {
  //   dialogOpen = true;
  // };
  const handleClose = () => {
    dialogOpen = false;
  };
</script>

<Dialog.Root bind:open={dialogOpen}>
  <Dialog.Trigger>
    <slot />
  </Dialog.Trigger>
  <Dialog.Content>
    <Dialog.Header>
      <Dialog.Title>本当にログアウトしますか？</Dialog.Title>
    </Dialog.Header>
    <div class="flex justify-center">
      <form action="/auth/logout" method="POST" use:enhance>
        <Button variant="delete" class="m-2" type="submit">ログアウト</Button>
      </form>
      <Button variant="close" class="m-2" on:click={handleClose}>キャンセル</Button>
    </div>
  </Dialog.Content>
</Dialog.Root>
