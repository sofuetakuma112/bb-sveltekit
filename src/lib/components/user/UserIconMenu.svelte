<script>
  import { onMount } from 'svelte';
  import LogOutDialogForMobile from '$lib/components/dialog/LogOutDialogForMobile.svelte';
  import * as Menubar from '$lib/components/ui/menubar';

  export let profileUrl = '';
  export let userId = '';
  export let className = '';
</script>

<div class={className}>
  <MenuBar.Root>
    <Menubar.MenuBarTrigger>
      <div class="size-10 cursor-pointer overflow-hidden rounded-full sm:size-16">
        <img src={profileUrl} alt="プロフィール画像" class="object-cover size-full" />
      </div>
    </Menubar.MenuBarTrigger>
    <Menubar.MenuBarContent>
      <Menubar.MenuBarItem>
        <LogOutDialogForMobile />
      </Menubar.MenuBarItem>
      <Menubar.MenuBarSeparator />
      <Menubar.MenuBarItem>
        <a href={`/${userId}/home`} class="flex justify-center">ユーザープロフィール</a>
      </Menubar.MenuBarItem>
    </Menubar.MenuBarContent>
  </MenuBar.Root>
</div>
