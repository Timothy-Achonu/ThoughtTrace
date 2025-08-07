export {default} from 'next-auth/middleware'

export const config = {
    // every route included here will be protected
    // the '/:path*' string will match and protect any nested routes of the routes included here
    matcher: ["/daily-questions", "/thoughts", "/create"],
  };