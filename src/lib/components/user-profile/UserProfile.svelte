<script lang="ts">
  export let profileUrl: string;
  export let userId: string;
  export let userName: string;
</script>

<div class="flex items-center pb-[60px]">
  <a href={`/${userId}/home`}>
    <div class="size-16 overflow-hidden rounded-lg">
      <!-- TODO: Imageコンポーネントに置き換える -->
      <img src={profileUrl} alt="ユーザープロフィール画像" class="size-full object-cover" />
    </div>
  </a>
  <a href={`/${userId}/home`}>
    <p class="hidden pl-3 text-base font-bold xl:block">{userName}</p>
  </a>
</div>
