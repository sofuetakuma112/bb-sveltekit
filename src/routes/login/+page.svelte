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
      <a
        class="px-4 py-2 border flex gap-2 border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-200 hover:border-slate-400 dark:hover:border-slate-500 hover:text-slate-900 dark:hover:text-slate-300 hover:shadow transition duration-150"
        href="/auth/oauth/google"
      >
        <span class="i-logos-google-icon size-6"></span>
        Googleでログイン
      </a>
    </div>
  </div>
</div>
