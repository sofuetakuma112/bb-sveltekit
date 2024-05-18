<script lang="ts">
  import EditProfile from '$lib/components/user/EditProfile.svelte';
  import { Button } from '$lib/components/ui/button';
  import * as Dialog from '$lib/components/ui/dialog';
  import { enhance } from '$app/forms';

  export let profileUrl;
  export let currentUserId;
  export let userId;
  export let userName;
  export let followerCount;
  export let followingCount;
  export let isFollowee;
  export let formData;
</script>

<div class="size-16 overflow-hidden rounded-lg sm:size-20">
  <Dialog.Root>
    {#if userId === currentUserId}
      <Dialog.Trigger class="size-full">
        <img src={profileUrl} alt="AI画像" class="size-full object-cover" />
      </Dialog.Trigger>
    {:else}
      <img src={profileUrl} alt="AI画像" class="size-full object-cover" />
    {/if}
    <Dialog.Content class="px-0 py-4">
      <EditProfile {formData} />
    </Dialog.Content>
  </Dialog.Root>
</div>
<h1 class="mt-2 text-2xl font-medium sm:h-12 sm:text-4xl">{userName}</h1>
{#if userId !== currentUserId && isFollowee}
  <form action="/follows?/delete" method="POST" use:enhance>
    <input type="hidden" name="userId" value={userId} />
    <Button type="submit" variant="following" font="bold" class="text-black-black mt-2"
      >フォロー中</Button
    >
  </form>
{:else if userId !== currentUserId}
  <form action="/follows?/create" method="POST" use:enhance>
    <input type="hidden" name="userId" value={userId} />
    <Button type="submit" variant="follow" font="bold" class="text-white-white mt-2"
      >フォロー</Button
    >
  </form>
{/if}

<div class="sm:t-7 mt-4 flex gap-8">
  <div>
    <p class="text-lg font-medium sm:text-xl">{followerCount}</p>
    <p class="text-sm font-medium sm:text-base">フォロワー</p>
  </div>
  <div>
    <p class="text-lg font-medium sm:text-xl">{followingCount}</p>
    <p class="text-sm font-medium sm:text-base">フォロー</p>
  </div>
</div>
