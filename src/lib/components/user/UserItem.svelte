<script>
  import { Button } from '$lib/components/ui/button';
  import { enhance } from '$app/forms';
  import clsx from 'clsx';

  export let profileUrl;
  export let userId;
  export let userName;
  export let isFollowee;
  export let className = '';
  export { className as class };
</script>

<div class={clsx('flex w-full justify-between gap-y-2 overflow-hidden', className)}>
  <div class="flex items-center">
    <div class="mr-2 size-8 overflow-hidden rounded-full">
      <a href={`/${userId}/home`}>
        <img src={profileUrl} alt="ユーザープロフィール画像" class="size-full object-cover" />
      </a>
    </div>
    <a href={`/${userId}/home`} class="flex items-center">
      <p class="text-black-black text-lg font-semibold">
        {userName}
      </p>
    </a>
  </div>
  <div class="flex justify-center">
    {#if isFollowee}
      <form method="POST" action="/follows?/delete" use:enhance>
        <input type="hidden" name="userId" value={userId} />
        <Button variant="following" font="bold" class="text-black-black">フォロー中</Button>
      </form>
    {:else}
      <form method="POST" action="/follows?/delete" use:enhance>
        <input type="hidden" name="userId" value={userId} />
        <Button variant="follow" font="bold" class="text-white-white">フォロー</Button>
      </form>
    {/if}
  </div>
</div>
