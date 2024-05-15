<script>
  import UserProfile from '$lib/components/user/UserProfile.svelte';
  import MobileMenubar from '$lib/components/header/MobileMenubar.svelte';
  import LogOutDialogForPC from '$lib/components/dialog/LogOutDialogForPC.svelte';
  import UserIconMenu from '$lib/components/user/UserIconMenu.svelte';
  import { Button } from '$lib/components/ui/button';
  import HeaderIconButton from '$lib/components/header/HeaderIconButton.svelte';

  import HomeIconButton from '$lib/components/header/iconButton/HomeIconButton.svelte';
  import NotificationIconButton from '$lib/components/header/iconButton/NotificationIconButton.svelte';
  import FolloweesIconButton from '$lib/components/header/iconButton/FolloweesIconButton.svelte';
  import FollowersIconButton from '$lib/components/header/iconButton/FollowersIconButton.svelte';
  import LikesIconButton from '$lib/components/header/iconButton/LikesIconButton.svelte';
  import PostIconButton from '$lib/components/header/iconButton/PostIconButton.svelte';

  export let user;
  let userId = user.id;

  let links = [
    { href: '/home', text: 'Home', type: 'home' },
    { href: '/notifications', text: '通知', type: 'notification' },
    { href: `/${userId}/followees`, text: 'フォロー一覧', type: 'followees' },
    { href: `/${userId}/followers`, text: 'フォロワー一覧', type: 'followers' },
    { href: `/${userId}/likes`, text: 'いいね一覧', type: 'likes' },
    { href: '/post', text: '投稿', type: 'post' }
  ];
  let buttons = [{ text: 'ログアウト', type: 'logout' }];
</script>

<header
  class="fixed bottom-0 z-10 h-14 w-full sm:static sm:z-0 sm:flex sm:h-auto sm:w-20 xl:col-span-2 xl:w-[280px]"
>
  <div
    class="hidden min-h-screen flex-1 flex-col border-r-2 bg-white-white p-2 sm:flex"
    style="overflow: visible;"
  >
    <UserProfile profileUrl={user.imageUrl ?? ''} {userId} userName={user.name} />
    <div class="hidden-x-8 gap-y-4 sm:grid xl:grid-cols-2 xl:px-6">
      {#each [...links, ...buttons] as { href, text, type }, i}
        {#if href}
          <a class="flex flex-col items-center xl:w-[100px]" {href} key={`header-link-${i}`}>
            <HeaderIconButton {type} />
            <p class="hidden py-1 text-sm xl:block">{text}</p>
          </a>
        {:else}
          <div class="flex flex-col items-center xl:w-[100px]" key={`header-button-${i}`}>
            <HeaderIconButton {type} />
            <p class="hidden py-1 text-sm xl:block">{text}</p>
          </div>
        {/if}
      {/each}
    </div>
  </div>
  <MobileMenubar icons={[...links, ...buttons]} />
</header>
