<script>
    import { page } from '$app/stores';
    import HeaderIconButton from '$lib/components/header/HeaderIconButton.svelte';
  
    // Icon型の定義
    export let icons = [];
  
    function getInitialSelectedIconIndex(icons, pathname) {
      return icons.findIndex((icon) => icon.href === pathname);
    }
  
    // 現在のページパスを取得
    $: pathname = $page.url.pathname;
  
    // 初期選択アイコンのインデックスを取得
    $: initialSelectedIconIndex = getInitialSelectedIconIndex(icons, pathname);
    $: selectedIconIndex =
      initialSelectedIconIndex !== -1 ? initialSelectedIconIndex : icons.length - 1;
  </script>
  
  <div class="flex size-full sm:hidden">
    {#each icons as { href, type, text }, i}
      {#if href}
        <a class="flex h-full flex-1 flex-col items-center" href={href} key={`header-link-${i}`}>
          {#if selectedIconIndex === i}
            <HeaderIconButton {type} class="bg-accent" />
          {:else}
            <HeaderIconButton {type} />
          {/if}
        </a>
      {:else}
        <div class="flex h-full flex-1 flex-col items-center" key={`header-link-${i}`}>
          {#if selectedIconIndex === i}
            <HeaderIconButton {type} class="bg-accent" />
          {:else}
            <HeaderIconButton {type} />
          {/if}
        </div>
      {/if}
    {/each}
  </div>