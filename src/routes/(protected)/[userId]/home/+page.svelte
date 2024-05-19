<script lang="ts">
  import PostCards from '$lib/components/card/PostCards.svelte';
  import type { PageData } from './$types';

  export let data: PageData;
</script>

<PostCards posts={data.posts} currentUser={data.currentUser} pageType="posts" />
