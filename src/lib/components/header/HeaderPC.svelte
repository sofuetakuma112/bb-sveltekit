<script lang="ts">
  import UserProfile from '$lib/components/user/UserProfile.svelte';
  import LogOutDialogForPC from '$lib/components/dialog/LogOutDialogForPC.svelte';
  import HeaderIconButton from '$lib/components/header/HeaderIconButton.svelte';

  export let userId: string;
  export let profileUrl: string;
  export let name: string;
  export let links: { href: string; text: string; type: string }[];
</script>

<div
  class="hidden sm:min-h-screen flex-1 flex-col border-r-2 bg-white-white p-2 sm:flex"
  style="overflow: visible;"
>
  <UserProfile {profileUrl} {userId} userName={name} />
  <div class="hidden-x-8 gap-y-4 sm:grid xl:grid-cols-2 xl:px-6">
    {#each links as { href, text, type }, i (href)}
      {#if href}
        <a class="flex flex-col items-center xl:w-[100px]" {href}>
          <HeaderIconButton {type} />
          <p class="hidden py-1 text-sm xl:block">{text}</p>
        </a>
      {:else}
        <div class="flex flex-col items-center xl:w-[100px]">
          <HeaderIconButton {type} />
          <p class="hidden py-1 text-sm xl:block">{text}</p>
        </div>
      {/if}
    {/each}
    <div class="flex flex-col items-center xl:w-[100px]">
      <LogOutDialogForPC class="bg-white-white" />
      <p class="hidden py-1 text-sm xl:block">ログアウト</p>
    </div>
  </div>
</div>
