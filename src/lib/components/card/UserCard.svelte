<script>
  import { Button } from '@/components/ui/button';
  import { Card } from '@/components/ui/card';
  import { enhance } from '$app/forms';

  export let profileUrl;
  export let userId;
  export let userName;
  export let isFollowee;
  export let className;
  export { className as class };
</script>

<Card variant="list" color="white" class="flex flex-col overflow-hidden {className}">
  <div class="h-[256px]">
    <a href={`/${userId}/home`}>
      <img src={profileUrl} alt="ユーザープロフィール画像" class="size-full object-cover" />
    </a>
  </div>
  <div class="px-2 pb-4 pt-1">
    <a href={`/${userId}/home`}>
      <p class="text-black-black pb-3 text-2xl font-semibold">
        {userName}
      </p>
    </a>
    <div class="flex justify-center">
      {#if isFollowee}
        <form method="POST" action="/follows?/delete" use:enhance>
          <input type="hidden" name="userId" value={userId} />
          <Button type="submit" variant="following" font="bold" class="text-black-black">
            フォロー中
          </Button>
        </form>
      {:else}
        <form method="POST" action="/follows?/create" use:enhance>
          <input type="hidden" name="userId" value={userId} />
          <Button type="submit" variant="follow" font="bold" class="text-white-white">
            フォロー
          </Button>
        </form>
      {/if}
    </div>
  </div>
</Card>
