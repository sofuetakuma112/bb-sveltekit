<script lang="ts">
  import { Button } from '$lib/components/ui/button';
  import FileUpload from '@/components/form/FileUpload.svelte';
  import { Input } from '$lib/components/ui/input';
  import { editProfileSchema, type EditProfileSchema } from '$lib/form/editProfile';
  import type { SuperValidated, Infer } from 'sveltekit-superforms';
  import { fileProxy, superForm } from 'sveltekit-superforms';
  import { zod } from 'sveltekit-superforms/adapters';
  import { onMount } from 'svelte';

  export let formData: SuperValidated<Infer<EditProfileSchema>>;
  let closeButtonElement: HTMLButtonElement;

  onMount(() => {
    const button = document.querySelector('button[data-melt-dialog-close]');
    if (!button) return;
    closeButtonElement = button as HTMLButtonElement;
  });

  const { form, errors, enhance } = superForm(formData, {
    validators: zod(editProfileSchema),
    onResult: ({ result }) => {
      if (result.status === 200) {
        closeButtonElement.click();
      }
    }
  });

  const file = fileProxy(form, 'file');
</script>

<form method="POST" action="?/updateUser" enctype="multipart/form-data" use:enhance>
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
      />
      {#if $errors.name}
        <p class="w-full text-red-500">{$errors.name}</p>
      {/if}
    </div>
    <div class="mt-12 w-full">
      <label for="file" class="text-md font-semibold">プロフィール画像</label>
      <FileUpload id="file" name="file" bind:files={$file} />
      {#if $errors.file}
        <p class="w-full text-red-500">{$errors.file}</p>
      {/if}
    </div>
    <Button type="submit" variant="upload" class="mt-9 font-semibold">投稿する</Button>
  </div>
</form>
