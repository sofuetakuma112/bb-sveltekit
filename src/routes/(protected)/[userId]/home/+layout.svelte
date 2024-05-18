<script lang="ts">
  import Profile from '$lib/components/user/Profile.svelte';
  import Tab from '$lib/components/profile/Tab.svelte';

  export let data;
</script>

<div class="flex flex-col px-4 pt-4 sm:px-12 sm:pb-[100px] sm:pt-9">
  <Profile
    profileUrl={data.user.imageUrl ?? ''}
    currentUserId={data.currentUser.id}
    userId={data.user.id}
    userName={data.user.name}
    followerCount={data.user.followerCount}
    followingCount={data.user.followingCount}
    isFollowee={data.user.isFollowee}
    formData={data.form}
  />
  <Tab userId={data.user.id} postsCount={data.postsCount} likePostsCount={data.likePostsCount} />
  <div class="flex flex-col pt-4 sm:pb-[100px] sm:pt-9">
    <slot />
  </div>
</div>
