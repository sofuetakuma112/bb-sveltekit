<script lang="ts">
  import PostCard from '$lib/components/card/PostCard.svelte';
  import { Button } from '$lib/components/ui/button';
  import HeartIcon from '$lib/components/icons/HeartIcon.svelte';

  export let data;
</script>

<div class="flex flex-col items-center pb-[100px] pt-5">
  <Button variant="ghost" class="border-amber-400">
    <HeartIcon class="size-7" />
  </Button>
  <h1 class="mt-4 h-8 w-[168px] text-center text-2xl font-semibold">いいね一覧</h1>
  <div class="mt-12">
    <div class="grid gap-x-16 gap-y-9 sm:grid-cols-2 sm:px-8 lg:grid-cols-3 2xl:grid-cols-4">
      {#each data.posts as post (post.id)}
        <PostCard
          postId={post.id}
          pageType="likes"
          userId={post.user.id}
          imageUrl={post.imageUrl ?? ''}
          imageName={post.imageName}
          profileUrl={post.user.imageUrl ?? ''}
          userName={post.user.name ?? ''}
          analysisResult={post.analysisResult}
          hashTags={post.hashTags}
          prompt={post.prompt}
        />
      {/each}
    </div>
  </div>
</div>
