<script>
  import LogOutDialogForMobile from '$lib/components/dialog/LogOutDialogForMobile.svelte';
  import * as Menubar from '$lib/components/ui/menubar';

  export let profileUrl = '';
  export let userId = '';
</script>

<Menubar.Root class="border-none p-0 flex-1 h-full flex justify-center">
  <Menubar.Menu>
    <Menubar.Trigger
      class="sm:hidden bg-white-white rounded-none flex h-full flex-1 p-0 items-center justify-center"
      ><div class="size-10 cursor-pointer overflow-hidden rounded-full sm:size-16">
        <img src={profileUrl} alt="プロフィール画像" class="object-cover size-full" />
      </div></Menubar.Trigger
    >
    <Menubar.Content>
      <Menubar.Item>
        <LogOutDialogForMobile />
      </Menubar.Item>
      <Menubar.Item
        ><a href={`/${userId}/home`} class="flex justify-center">ユーザープロフィール</a
        ></Menubar.Item
      >
    </Menubar.Content>
  </Menubar.Menu>
</Menubar.Root>
