<script lang="ts">
  import PostAddIcon from '$lib/components/icons/PostAddIcon.svelte';

  export let id;
  export let name;
  export let files: FileList;

  let previewUrl: string | ArrayBuffer | null = null;
  let fileInputRef: HTMLInputElement;

  const ACCEPTED_IMAGE_TYPES = ['image/png', 'image/jpeg', 'image/gif', 'image/webp'];
  const MAX_FILE_SIZE = 10485760; // 10MB

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const files = event.dataTransfer.files;

    if (files.length === 0) return;

    const file = files[0];

    if (!ACCEPTED_IMAGE_TYPES.includes(file.type) || file.size > MAX_FILE_SIZE) return;

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result;
      previewUrl = result;
    };
    reader.readAsDataURL(file);
  };

  $: {
    if (files.length !== 0) {
      const file = files[0];

      if (file && ACCEPTED_IMAGE_TYPES.includes(file.type) && file.size <= MAX_FILE_SIZE) {
        const reader = new FileReader();
        reader.onload = () => {
          const result = reader.result;
          previewUrl = result;
        };
        reader.readAsDataURL(file);
      }
    }
  }

  const openFileInput = () => {
    fileInputRef.click();
  };
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
  class="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-blue-300"
  on:dragover={handleDragOver}
  on:drop={handleDrop}
  on:click={openFileInput}
>
  <div class="p-4">
    <PostAddIcon class="size-8" />
  </div>
  <input
    type="file"
    bind:this={fileInputRef}
    class="hidden"
    accept="image/*"
    bind:files
    {id}
    {name}
  />
  {#if typeof previewUrl === 'string'}
    <img src={previewUrl} alt="Preview" class="m-4 size-28 rounded-md object-cover" />
  {/if}
</div>
