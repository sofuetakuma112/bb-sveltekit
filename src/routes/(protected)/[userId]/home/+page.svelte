<script lang="ts">
  import PostCard from '$lib/components/card/PostCard.svelte';
  import type { PageData } from './$types';

  export let data: PageData;
</script>

<div
  class="mt-4 grid w-full gap-x-16 gap-y-9 pb-16 sm:mt-7 sm:w-auto sm:pb-0 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4"
>
  {#each data.posts as post, i (post.id)}
    <PostCard
      postId={post.id}
      imageUrl={post.imageUrl ?? ''}
      imageName={post.imageName}
      analysisResult={post.analysisResult}
      profileUrl={post.user.imageUrl ?? ''}
      currentUserId={data.currentUser.id}
      userId={post.user.id}
      userName={post.user.name ?? ''}
      hashtags={post.hashtags}
      prompt={post.prompt}
    />
  {/each}
</div>
