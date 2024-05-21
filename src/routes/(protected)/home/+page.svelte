<script lang="ts">
  import { Tabs, TabsList, TabsTrigger, TabsContent } from '$lib/components/ui/tabs';
  import { goto } from '$app/navigation';
  import SwipeCardContainerPC from '$lib/components/card/SwipeCardContainerPC.svelte';
  import SwipeCardContainerMobile from '$lib/components/card/SwipeCardContainerMobile.svelte';
  import type { PageData } from './$types';

  export let data: PageData;
</script>

<div class="h-full px-2 sm:px-8">
  <Tabs value={data.type} class="flex flex-col h-full">
    <div class="flex h-14 sm:flex-1 items-center sm:max-h-[calc(100%-48px-785px-20px)] sm:py-4">
      <TabsList class="mx-auto flex justify-center" variant="text">
        <TabsTrigger value="recommend" variant="text" on:click={() => goto(`/home?type=recommend`)}>
          おすすめ
        </TabsTrigger>
        <div class="mx-4 min-h-full w-0.5 bg-gray-300"></div>
        <TabsTrigger value="following" variant="text" on:click={() => goto(`/home?type=following`)}>
          フォロー中
        </TabsTrigger>
      </TabsList>
    </div>
    <div class="h-full max-h-[calc(100svh-56px-56px-12px)] flex-1 sm:max-h-full">
      <TabsContent value={data.type} variant="text" class="h-full flex justify-center flex-1">
        {#if data.isMobile}
          <SwipeCardContainerMobile tabValue={data.type} post={data.post} />
        {:else}
          <SwipeCardContainerPC tabValue={data.type} post={data.post} />
        {/if}
      </TabsContent>
    </div>
  </Tabs>
</div>
