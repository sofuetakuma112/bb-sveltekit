<script lang="ts">
  import { onMount } from 'svelte';
  import { TinderCard } from '$lib/components/card/TinderCard';
  import type { Direction } from '$lib/components/card/TinderCard/types';

  import image1 from '$lib/assets/1.jpeg';
  import image2 from '$lib/assets/2.png';
  import image3 from '$lib/assets/3.jpeg';
  import image4 from '$lib/assets/4.jpeg';
  import image5 from '$lib/assets/5.png';

  const db = [
    {
      name: 'Richard Hendricks',
      url: image1
    },
    {
      name: 'Erlich Bachman',
      url: image2
    },
    {
      name: 'Monica Hall',
      url: image3
    },
    {
      name: 'Jared Dunn',
      url: image4
    },
    {
      name: 'Dinesh Chugtai',
      url: image5
    }
  ];

  let characters: {
    name: string;
    url: string;
  }[] = [];
  let lastDirection = '';

  onMount(() => {
    characters = db;
  });

  const swiped = (direction: Direction, nameToDelete: string) => {
    console.log('removing: ' + nameToDelete);
    lastDirection = direction;
  };

  const outOfFrame = (name: string) => {
    console.log(name + ' left the screen!');
  };
</script>

<div class="app h-svh">
  <main class="flex justify-center items-center size-full">
    <div class="cardContainer relative">
      {#each characters as character (character.name)}
        <TinderCard
          className="swipe absolute"
          onSwipe={(dir) => swiped(dir, character.name)}
          onCardLeftScreen={() => outOfFrame(character.name)}
        >
          <div class="card" style="background-image: url({character.url})">
            <h3>{character.name}</h3>
          </div>
        </TinderCard>
      {/each}
    </div>
  </main>
  {#if lastDirection}
    <h2 class="infoText">You swiped {lastDirection}</h2>
  {/if}
</div>

<style>
  body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu',
      'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace;
  }

  #root {
    text-align: center;
    display: flex;
    justify-content: center;
    width: 100vw;
    min-height: 100vh;
    overflow: hidden;
    /* background: linear-gradient(#fff, #999); */
    background: linear-gradient(#e66465, #9198e5);
  }

  * {
    user-select: none;
  }

  #root > div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .app {
    overflow: hidden;
  }

  .app > div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .row {
    flex-direction: row !important;
  }

  .row > * {
    margin: 5px;
  }

  h1 {
    font-family: 'Damion', cursive;
    color: #fff;
    text-shadow: 0px 0px 60px 0px rgba(0, 0, 0, 0.3);
  }

  h2 {
    color: #fff;
  }

  .swipe {
    position: absolute;
  }

  .cardContainer {
    width: 90vw;
    max-width: 260px;
    height: 300px;
  }

  .card {
    position: relative;
    background-color: #fff;
    width: 80vw;
    max-width: 260px;
    height: 300px;
    box-shadow: 0px 0px 60px 0px rgba(0, 0, 0, 0.3);
    border-radius: 20px;
    background-size: cover;
    background-position: center;
  }

  .cardContent {
    width: 100%;
    height: 100%;
  }

  .swipe:last-of-type {
  }

  .card h3 {
    position: absolute;
    bottom: 0;
    margin: 10px;
    color: #fff;
  }

  .infoText {
    width: 100%;
    justify-content: center;
    display: flex;
    color: #fff;
    animation-name: popup;
    animation-duration: 800ms;
  }

  .buttons {
    margin: 20px;
    display: flex;
    flex-wrap: wrap;
  }

  @media (max-width: 625px) {
    .buttons {
      flex-direction: column;
    }
  }

  .buttons button {
    flex-shrink: 0;
    padding: 10px;
    border-radius: 5px;
    border: none;
    color: #fff;
    font-size: 18px;
    background-color: #9198e5;
    transition: 200ms;
    margin: 10px;
    font-weight: bolder;
    width: 160px;
    box-shadow: 0px 0px 30px 0px rgba(0, 0, 0, 0.1);
  }

  .buttons button:hover {
    transform: scale(1.05);
  }

  @keyframes popup {
    0% {
      transform: scale(1, 1);
    }
    10% {
      transform: scale(1.1, 1.1);
    }
    30% {
      transform: scale(0.9, 0.9);
    }
    50% {
      transform: scale(1, 1);
    }
    57% {
      transform: scale(1, 1);
    }
    64% {
      transform: scale(1, 1);
    }
    100% {
      transform: scale(1, 1);
    }
  }
</style>
