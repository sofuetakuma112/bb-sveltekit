<script>
  import HomeIconButton from '$lib/components/header/iconButton/HomeIconButton.svelte';
  import NotificationIconButton from '$lib/components/header/iconButton/NotificationIconButton.svelte';
  import FolloweesIconButton from '$lib/components/header/iconButton/FolloweesIconButton.svelte';
  import FollowersIconButton from '$lib/components/header/iconButton/FollowersIconButton.svelte';
  import LikesIconButton from '$lib/components/header/iconButton/LikesIconButton.svelte';
  import PostIconButton from '$lib/components/header/iconButton/PostIconButton.svelte';
  
  export let type;
  export let className = '';
</script>

{#if type === 'home'}
  <HomeIconButton {className} />
{:else if type === 'notification'}
  <NotificationIconButton {className} />
{:else if type === 'followees'}
  <FolloweesIconButton {className} />
{:else if type === 'followers'}
  <FollowersIconButton {className} />
{:else if type === 'likes'}
  <LikesIconButton {className} />
{:else if type === 'post'}
  <PostIconButton {className} />
{/if}
