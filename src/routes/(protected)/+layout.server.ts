import { setupEvent } from '@/server/setupEvent';

export const load = async (event) => {
  await setupEvent(event);
  return { user: event.locals.user };
};
