import {createCookieSessionStorage} from '@remix-run/node'

const {getSession, commitSession, destroySession} = createCookieSessionStorage({
  cookie: {
    name: '__session',
    sameSite: 'lax',
    secrets: [process.env.SESSION_SECRET!],
    secure: process.env.NODE_ENV === 'production',
  },
})

export {getSession, commitSession, destroySession}
