<script lang="ts">
  import { Button } from '$lib/components/ui/button';
  import UserCard from '$lib/components/card/UserCard.svelte';
  import UserItem from '$lib/components/user/UserItem.svelte';
  import PeopleIcon from '$lib/components/icons/PeopleIcon.svelte';
  import type { PageData } from './$types';

  export let data: PageData;
</script>

<div class="flex flex-col items-center pb-[100px] pt-5">
  <Button variant="ghost" class="border-amber-400">
    <PeopleIcon class="size-8 bg-white" />
  </Button>
  <h1 class="mb-4 mt-2 h-8 w-[168px] text-center text-xl font-semibold sm:mb-8 sm:mt-4 sm:text-2xl">
    フォロワー一覧
  </h1>
  <div
    class="w-full gap-x-16 gap-y-9 px-4 sm:grid sm:w-auto sm:grid-cols-2 sm:px-8 lg:grid-cols-3 2xl:grid-cols-4"
  >
    {#if data.isMobile}
      {#each data.followers as follower (follower.id)}
        <UserCard
          profileUrl={follower.imageUrl ?? ''}
          userId={follower.id}
          userName={follower.name ?? ''}
          isFollowee={follower.isFollowee}
        />
      {/each}
    {:else}
      {#each data.followers as follower (follower.id)}
        <UserItem
          profileUrl={follower.imageUrl ?? ''}
          userId={follower.id}
          userName={follower.name ?? ''}
          isFollowee={follower.isFollowee}
        />
      {/each}
    {/if}
  </div>
</div>
