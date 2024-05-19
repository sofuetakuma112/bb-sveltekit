export const GET = async (event) => {
  if (event.locals.user) {
    return new Response(null, {
      status: 302,
      headers: {
        Location: '/home'
      }
    });
  }

  return new Response(null, {
    status: 302,
    headers: {
      Location: '/login'
    }
  });
};
