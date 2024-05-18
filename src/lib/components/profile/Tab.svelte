<script lang="ts">
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  import { Tabs, TabsList, TabsTrigger } from '$lib/components/ui/tabs';

  export let userId: string;
  export let postsCount: number;
  export let likePostsCount: number;

  $: selectedTab = $page.url.pathname.split('/')[2];
</script>

<Tabs
  value={selectedTab}
  style="height: 100%;"
  class="mt-8 h-10 w-full max-w-[1072px] border-b-2 sm:mt-[64px]"
>
  <div class="flex h-10">
    <TabsList class="flex gap-[48px]" variant="text">
      <TabsTrigger value="home" variant="profileText" on:click={() => goto(`/${userId}/home`)}>
        <div class="flex gap-8">
          <p>投稿</p>
          <p>{postsCount}</p>
        </div>
      </TabsTrigger>
      <TabsTrigger
        value="super-likes"
        variant="profileText"
        on:click={() => goto(`/${userId}/home?type=super-like`)}
      >
        <div class="flex gap-8">
          <p>スーパーライク</p>
          <p>{likePostsCount}</p>
        </div>
      </TabsTrigger>
    </TabsList>
  </div>
</Tabs>
