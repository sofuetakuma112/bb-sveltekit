<script>
  import { createEventDispatcher, onMount } from 'svelte';

  let open = false;
  const dispatch = createEventDispatcher();

  function toggle() {
    open = !open;
  }
</script>

<div>
  <slot name="trigger">
    <button on:click={toggle}>Toggle Dialog</button>
  </slot>
  {#if open}
    <div class="dialog-overlay" on:click={toggle}></div>
    <div class="dialog-content">
      <slot name="content"></slot>
    </div>
  {/if}
</div>

<style>
  .dialog-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.5);
  }
  .dialog-content {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: white;
    padding: 2em;
    border-radius: 8px;
  }
</style>
