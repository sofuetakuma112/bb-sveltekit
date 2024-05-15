<script>
  export let profileUrl = '';
  export let userId = '';
  export let userName = '';
</script>

<div class="flex items-center pb-[60px]">
  <a href={`/${userId}/home`}>
    <div class="size-16 overflow-hidden rounded-lg">
      <img src={profileUrl} alt="ユーザープロフィール画像" class="size-full object-cover" />
    </div>
  </a>
  <a href={`/${userId}/home`}>
    <p class="hidden pl-3 text-base font-bold xl:block">{userName}</p>
  </a>
</div>
