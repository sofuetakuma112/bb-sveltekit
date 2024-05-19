<script lang="ts">
  import PostCards from '$lib/components/card/PostCards.svelte';
  import { Button } from '$lib/components/ui/button';
  import HeartIcon from '$lib/components/icons/HeartIcon.svelte';
  import type { PageData } from './$types';

  export let data: PageData;
</script>

<div class="flex flex-col items-center pb-[100px] pt-5">
  <Button variant="ghost" class="border-amber-400">
    <HeartIcon class="size-7 bg-white" />
  </Button>
  <h1 class="mt-4 h-8 w-[168px] text-center text-2xl font-semibold">いいね一覧</h1>
  <div class="sm:mt-12">
    <PostCards posts={data.posts} currentUser={data.currentUser} />
  </div>
</div>
