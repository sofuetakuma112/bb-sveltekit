<script lang="ts">
  import type { PageData } from './$types';

  export let data: PageData;
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
  />
  <Tab userId={data.user.id} posts={data.posts} superLikePosts={data.superLikePosts} />
  <div class="flex flex-col pt-4 sm:pb-[100px] sm:pt-9">
    <slot />
  </div>
</div>
