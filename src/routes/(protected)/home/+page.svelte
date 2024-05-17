<script lang="ts">
  import { Tabs, TabsList, TabsTrigger, TabsContent } from '$lib/components/ui/tabs';
  import { goto } from '$app/navigation';
  import SwipeCards from '$lib/components/card/SwipeCards.svelte';

  export let data;
</script>

<div class="h-full px-2 sm:px-8">
  <Tabs value="recommend" class="flex flex-col h-full">
    <div
      class="flex h-16 sm:flex-1 items-center sm:max-h-[calc(100%-48px-785px-20px)] sm:min-h-[calc(48px+16px_*_2)] sm:py-4"
    >
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
    <div class="h-full max-h-[calc(100%-64px-64px)] flex-1 sm:max-h-full">
      <TabsContent value={data.type} variant="text" class="h-full flex justify-center flex-1">
        <SwipeCards tabValue={data.type} post={data.post} />
      </TabsContent>
    </div>
  </Tabs>
</div>
