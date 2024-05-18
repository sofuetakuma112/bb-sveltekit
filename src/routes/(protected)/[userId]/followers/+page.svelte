<script>
  import { Button } from '$lib/components/ui/button';
  import UserCard from '$lib/components/card/UserCard.svelte';
  import UserItem from '$lib/components/user/UserItem.svelte';
  import PeopleIcon from '@/components/icons/PeopleIcon.svelte';

  export let data;
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
    {#each data.followers as follower (follower.id)}
      <UserCard
        profileUrl={followee.imageUrl ?? ''}
        userId={followee.id}
        userName={followee.name ?? ''}
        isFollowee={followee.isFollowee}
        class="hidden sm:block"
      />
      <UserItem
        profileUrl={followee.imageUrl ?? ''}
        userId={followee.id}
        userName={followee.name ?? ''}
        isFollowee={followee.isFollowee}
        class="sm:hidden"
      />
    {/each}
  </div>
</div>
