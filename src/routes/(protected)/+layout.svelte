<script lang="ts">
  import type { LayoutData } from './$types';
  import HeaderPC from '$lib/components/header/HeaderPC.svelte';
  import HeaderMobile from '$lib/components/header/HeaderMobile.svelte';

  export let data: LayoutData;

  let links = [
    { href: '/home', text: 'Home', type: 'home' },
    { href: '/notifications', text: '通知', type: 'notification' },
    { href: `/${data.user.id}/followees`, text: 'フォロー一覧', type: 'followees' },
    { href: `/${data.user.id}/followers`, text: 'フォロワー一覧', type: 'followers' },
    { href: `/${data.user.id}/likes`, text: 'いいね一覧', type: 'likes' },
    { href: '/post', text: '投稿', type: 'post' }
  ];
</script>

<svelte:head>
  <title>BeauBelle</title>
</svelte:head>
<div class="flex h-svh sm:min-h-screen">
  <header
    class="fixed bottom-0 z-10 h-14 w-full sm:static sm:z-0 sm:flex sm:h-auto sm:w-20 xl:col-span-2 xl:w-[280px]"
  >
    {#if data.isMobile}<HeaderMobile
        {links}
        profileUrl={data.user.imageUrl}
        userId={data.user.id}
      />{:else}<HeaderPC
        {links}
        profileUrl={data.user.imageUrl}
        userId={data.user.id}
        name={data.user.name}
      />{/if}
  </header>
  <div class="relative flex-1 overflow-auto">
    <slot />
  </div>
</div>
