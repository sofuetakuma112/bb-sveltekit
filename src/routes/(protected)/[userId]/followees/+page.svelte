<script lang="ts">
  import { Button } from '$lib/components/ui/button';
  import UserCard from '$lib/components/card/UserCard.svelte';
  import UserItem from '$lib/components/user/UserItem.svelte';
  import PersonIcon from '$lib/components/icons/PersonIcon.svelte';
  import type { PageData } from './$types';

  export let data: PageData;
</script>

<div class="flex flex-col items-center pb-[100px] pt-5">
  <Button variant="ghost" class="border-amber-400">
    <PersonIcon class="size-8 bg-white" />
  </Button>
  <h1 class="mb-4 mt-2 h-8 w-[168px] text-center text-xl font-semibold sm:mb-8 sm:mt-4 sm:text-2xl">
    フォロー一覧
  </h1>
  <div
    class="w-full gap-x-16 gap-y-9 px-4 sm:grid sm:w-auto sm:grid-cols-2 sm:px-8 lg:grid-cols-3 2xl:grid-cols-4"
  >
    {#if data.isMobile}
      {#each data.followees as followee (followee.id)}
        <UserItem
          profileUrl={followee.imageUrl ?? ''}
          userId={followee.id}
          userName={followee.name ?? ''}
          isFollowee={followee.isFollowee}
        />
      {/each}
    {:else}
      {#each data.followees as followee (followee.id)}
        <UserCard
          profileUrl={followee.imageUrl ?? ''}
          userId={followee.id}
          userName={followee.name ?? ''}
          isFollowee={followee.isFollowee}
        />
      {/each}
    {/if}
  </div>
</div>
