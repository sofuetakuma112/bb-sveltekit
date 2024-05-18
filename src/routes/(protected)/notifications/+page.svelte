<script>
  import { convertToJST } from '$lib/date';
  import { Button } from '$lib/components/ui/button';
  import NotificationsIcon from '@/components/icons/NotificationsIcon.svelte';

  export let data;
</script>

<div class="flex flex-col items-center pt-5">
  <Button variant="ghost" class="border-amber-400">
    <NotificationsIcon class="size-7 bg-white" />
  </Button>
  <h1 class="mt-4 h-8 w-[168px] text-center text-xl font-semibold sm:text-2xl">通知</h1>
  <div class="mt-4 w-full px-4 sm:mt-8 sm:px-0">
    {#each data.notifications as notification (notification.id)}
      <div class="mx-auto mt-2 flex w-full max-w-[400px] items-center justify-between gap-x-4">
        <div class="flex gap-x-2">
          <a href={`/${notification.notifierUser.id}/home`}>
            <div class="size-8 overflow-hidden rounded-sm sm:size-12">
              <img
                class="size-full object-cover"
                src={notification.notifierUser.imageUrl ?? ''}
                alt="userImage"
              />
            </div>
          </a>
          {#if notification.notificationType === 'like'}
            <p class="flex items-center">
              <a href={`/${notification.notifierUser.id}/home`}
                >{notification.notifierUser.userName}</a
              >にいいねされました
            </p>
          {:else if notification.notificationType === 'follow'}
            <p class="flex items-center">
              <a href={`/${notification.notifierUser.id}/home`}
                >{notification.notifierUser.userName}</a
              >にフォローされました
            </p>
          {:else if notification.notificationType === 'super_like'}
            <p class="flex items-center">
              <a href={`/${notification.notifierUser.id}/home`}
                >{notification.notifierUser.userName}</a
              >にスーパーライクされました
            </p>
          {/if}
        </div>
        <p class="text-gray-300">{convertToJST(notification.createdAt.toString())}</p>
      </div>
    {/each}
  </div>
</div>
