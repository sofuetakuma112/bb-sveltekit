<script lang="ts">
  import { page } from '$app/stores';
  import HeaderIconButton from '$lib/components/header/HeaderIconButton.svelte';
  import UserIconMenu from '$lib/components/user/UserIconMenu.svelte';

  type Link = {
    href: string;
    text: string;
    type: string;
  };

  // Icon型の定義
  export let links: Link[] = [];

  function getInitialSelectedIconIndex(links: Link[], pathname: string) {
    return links.findIndex((icon) => icon.href === pathname);
  }

  // 現在のページパスを取得
  $: pathname = $page.url.pathname;

  // 初期選択アイコンのインデックスを取得
  $: initialSelectedIconIndex = getInitialSelectedIconIndex(links, pathname);
  $: selectedIconIndex =
    initialSelectedIconIndex !== -1 ? initialSelectedIconIndex : links.length - 1;
</script>

<div class="flex size-full sm:hidden">
  {#each links as { href, type }, i (href)}
    {#if href}
      <a class="flex h-full flex-1 flex-col items-center" {href}>
        {#if selectedIconIndex === i}
          <HeaderIconButton {type} className="bg-accent" />
        {:else}
          <HeaderIconButton {type} />
        {/if}
      </a>
    {:else}
      <div class="flex h-full flex-1 flex-col items-center">
        {#if selectedIconIndex === i}
          <HeaderIconButton {type} className="bg-accent" />
        {:else}
          <HeaderIconButton {type} />
        {/if}
      </div>
    {/if}
  {/each}
  <UserIconMenu />
</div>
