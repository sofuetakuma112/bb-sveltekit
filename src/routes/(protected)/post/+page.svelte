<script lang="ts">
  import { fileProxy, superForm } from 'sveltekit-superforms';
  import { postSchema } from '$lib/form/post';
  import { zod } from 'sveltekit-superforms/adapters';
  import FileUpload from '@/components/form/FileUpload.svelte';
  import { Input } from '$lib/components/ui/input';
  import { Textarea } from '@/components/ui/textarea';
  import { Button } from '$lib/components/ui/button';

  export let data;

  const { form, errors, enhance } = superForm(data.form, {
    validators: zod(postSchema)
  });

  const file = fileProxy(form, 'file');
</script>

<div class="pb-16 sm:pb-0">
  <form method="POST" enctype="multipart/form-data" use:enhance>
    <div class="mt-8 flex flex-col items-center px-4 sm:mt-8 max-w-[500px] mx-auto">
      <h1 class="text-xl font-bold sm:text-2xl">さあ、写真をアップロードしよう</h1>
      <div class="mt-6 w-full sm:mt-12 flex flex-col">
        <label for="file">デスクトップから写真をドラッグできます。</label>
        <FileUpload id="file" name="file" bind:files={$file} />
        {#if $errors.file}
          <p class="w-full text-red-500 text-left">{$errors.file}</p>
        {/if}
      </div>
      <div class="mt-4 w-full sm:mt-7 flex flex-col">
        <label for="imageName" class="text-xl font-semibold">画像の女性の名前</label>
        <Input
          type="text"
          placeholder="maria"
          id="imageName"
          name="imageName"
          bind:value={$form.imageName}
        />
        {#if $errors.imageName}
          <p class="w-full text-red-500">{$errors.imageName}</p>
        {/if}
      </div>
      <div class="mt-4 w-full sm:mt-7 flex flex-col">
        <label for="imageAge" class="text-xl font-semibold">画像の女性の年齢</label>
        <Input type="text" placeholder="22" id="imageAge" name="imageAge" bind:value={$form.imageAge} />
        {#if $errors.imageAge}
          <p class="w-full text-red-500">{$errors.imageAge}</p>
        {/if}
      </div>
      <div class="mt-4 w-full sm:mt-7 flex flex-col">
        <label for="prompt" class="text-xl font-semibold">プロンプト</label>
        <Textarea
          placeholder="An astronaut playing guitar at Coachella, psychodelic background, photorealistic, f1.4, 4k..."
          id="prompt"
          name="prompt"
          bind:value={$form.prompt}
        />
        {#if $errors.prompt}
          <p class="w-full text-red-500">{$errors.prompt}</p>
        {/if}
      </div>
      <div class="mt-4 w-full sm:mt-7 flex flex-col">
        <label for="hashtag" class="text-xl font-semibold">ハッシュタグ</label>
        <Input
          placeholder="#ブロンド #ブルベ #高身長"
          id="hashtag"
          type="text"
          name="hashtag"
          bind:value={$form.hashtag}
        />
        {#if $errors.hashtag}
          <p class="w-full text-red-500">{$errors.hashtag}</p>
        {/if}
      </div>
      <Button type="submit" variant="upload" class="mt-5 font-semibold sm:mt-9">投稿する</Button>
    </div>
  </form>
</div>
