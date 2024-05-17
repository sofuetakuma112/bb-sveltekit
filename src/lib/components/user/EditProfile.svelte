<script lang="ts">
  import { Button } from '$lib/components/ui/button';
  import FileUpload from '@/components/form/FileUpload.svelte';
  import { Loader } from 'lucide-svelte';
  import { Input } from '$lib/components/ui/input';
  import type { EditProfileSchema } from '$lib/form/editProfile';
  import type { SuperValidated, Infer } from 'sveltekit-superforms';
  import { superForm } from 'sveltekit-superforms';

  export let userName;

  export let data: SuperValidated<Infer<EditProfileSchema>>;

  const { form, errors, enhance } = superForm(data);
</script>

<!-- TODO: 正しいURLにする -->
<form method="POST" action="/">
  <div class="mt-4 flex flex-col items-center px-4 sm:px-8">
    <h1 class="text-lg font-bold sm:text-2xl">プロフィールを編集しよう</h1>
    <div class="mt-7 w-full">
      <label for="name" class="text-md font-semibold">あなたの名前</label>
      <Input
        type="text"
        variant="round"
        borderColor="blue"
        placeholder="name"
        id="name"
        name="name"
        bind:value={$form.name}
        defaultValue={userName}
      />
      {#if $errors.name}
        <p class="w-full text-red-500">{$errors.name}</p>
      {/if}
    </div>
    <div class="mt-12 w-full">
      <label for="file" class="text-md font-semibold">プロフィール画像</label>
      <FileUpload id="file" name="file" bind:value={$form.file} />
      {#if $errors.file}
        <p class="w-full text-red-500">{$errors.file}</p>
      {/if}
    </div>
    <Button variant="upload" class="mt-9 font-semibold">
      投稿する
    </Button>
  </div>
</form>
