<script lang="ts">
  import { Button } from '$lib/components/ui/button';
  import { goto } from '$app/navigation';
</script>

<div class="flex h-screen flex-col items-center justify-start pt-12">
  <h1 class="text-5xl font-bold text-blue-300">BeauBelle</h1>
  <h2 class="pt-32 text-center text-2xl font-semibold">
    はじめまして
    <br />
    BeauBelleへようこそ
  </h2>
  <div class="flex flex-1 flex-col items-center pt-32">
    <div class="flex flex-col items-center">
      <Button
        class="my-3 w-72 rounded-lg px-4 py-2 font-bold bg-white text-black border border-black"
        on:click={() => goto('/auth/oauth/google')}
      >
        Googleでログイン
      </Button>
    </div>
  </div>
</div>
