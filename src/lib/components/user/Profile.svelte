<script>
  import EditProfile from '$lib/components/user/EditProfile.svelte';
  import { Button } from '$lib/components/ui/button';
  import { Dialog, DialogContent, DialogTrigger } from '$lib/components/ui/dialog';

  export let profileUrl;
  export let currentUserId;
  export let userId;
  export let userName;
  export let followerCount;
  export let followingCount;
  export let isFollowee;

  let open = false;

  function handleClose() {
    open = false;
  }
</script>

<div class="size-16 overflow-hidden rounded-lg sm:size-20">
  <Dialog>
    {#if userId === currentUserId}
      <DialogTrigger asChild on:click={() => (open = true)} class="size-full">
        <button>
          <img src={profileUrl} alt="AI画像" class="size-full object-cover" />
        </button>
      </DialogTrigger>
    {:else}
      <img src={profileUrl} alt="AI画像" class="size-full object-cover" />
    {/if}

    <DialogContent class="px-0 py-4" bind:open>
      <EditProfile {userName} close={handleClose} />
    </DialogContent>
  </Dialog>
</div>
<h1 class="mt-2 text-2xl font-medium sm:h-12 sm:text-4xl">{userName}</h1>
<!-- Todo: 認証が入ったら修正, フォロー、フォロー中も -->
{#if userId !== currentUserId && isFollowee}
  <form action="/follows/delete" method="post">
    <input type="hidden" name="userId" value={userId} />
    <Button variant="following" font="bold" class="text-black-black mt-2">フォロー中</Button>
  </form>
{:else if userId !== currentUserId}
  <form action="/follows/create" method="post">
    <input type="hidden" name="userId" value={userId} />
    <Button variant="follow" font="bold" class="text-white-white mt-2">フォロー</Button>
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
