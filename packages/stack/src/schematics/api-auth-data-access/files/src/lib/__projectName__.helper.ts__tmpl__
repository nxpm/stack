import { Request } from 'express'

export function cookieExtractor(req: Request) {
  const name = process.env.API_COOKIE_NAME || '__session'
  return req?.cookies?.[name] ? req.cookies[name] : undefined
}
