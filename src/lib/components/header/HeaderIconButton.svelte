<script>
  import HomeIconButton from '$lib/components/header/iconButton/HomeIconButton.svelte';
  import NotificationIconButton from '$lib/components/header/iconButton/NotificationIconButton.svelte';
  import FolloweesIconButton from '$lib/components/header/iconButton/FolloweesIconButton.svelte';
  import FollowersIconButton from '$lib/components/header/iconButton/FollowersIconButton.svelte';
  import LikesIconButton from '$lib/components/header/iconButton/LikesIconButton.svelte';
  import PostIconButton from '$lib/components/header/iconButton/PostIconButton.svelte';

  export let type;
  export let className = undefined;
  export { className as class };
</script>

{#if type === 'home'}
  <HomeIconButton class={className} />
{:else if type === 'notification'}
  <NotificationIconButton class={className} />
{:else if type === 'followees'}
  <FolloweesIconButton class={className} />
{:else if type === 'followers'}
  <FollowersIconButton class={className} />
{:else if type === 'likes'}
  <LikesIconButton class={className} />
{:else if type === 'post'}
  <PostIconButton class={className} />
{/if}
