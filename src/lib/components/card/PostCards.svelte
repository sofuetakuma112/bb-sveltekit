<script lang="ts">
  import type { User } from 'lucia';
  import PostCard from './PostCard.svelte';

  export let posts: {
    id: string;
    imageUrl: string | undefined;
    imageName: string;
    analysisResult: boolean | null;
    hashtags:
      | {
          id: string;
          name: string;
        }[]
      | undefined;
    prompt: string;
    user: {
      id: string;
      imageUrl: string | null;
      name: string | undefined;
    };
  }[];
  export let currentUser: User;
</script>

<div class="flex flex-wrap w-full sm:pb-0 xl:max-w-[1140px]">
  {#each posts as post (post.id)}
    <PostCard
      postId={post.id}
      pageType="likes"
      userId={post.user.id}
      imageUrl={post.imageUrl ?? ''}
      imageName={post.imageName}
      profileUrl={post.user.imageUrl ?? ''}
      userName={post.user.name ?? ''}
      analysisResult={post.analysisResult}
      hashtags={post.hashtags}
      prompt={post.prompt}
      currentUserId={currentUser.id}
    />
  {/each}
</div>
