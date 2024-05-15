<script>
  import Dialog from './Dialog.svelte';
  import { Button } from '$lib/components/ui/button';
</script>

<Dialog>
  <div slot="trigger">
    <slot name="toggle"></slot>
  </div>
  <div slot="content">
    <h2>本当にログアウトしますか？</h2>
    <div class="flex justify-center">
      <Button variant="delete" className="m-2">ログアウト</Button>
      <Button variant="close" class="m-2" on:click={toggle}>キャンセル</Button>
    </div>
  </div>
</Dialog>
