import { http, HttpResponse } from 'msw'

export const handlers = [
  // Auth endpoints
  http.post('/api/auth/signin', () => {
    return res(
      ctx.status(200),
      ctx.json({
        user: {
          id: 1,
          username: 'testuser',
          email: 'test@example.com'
        }
      })
    )
  }),

  // User profile endpoints
  rest.get('/api/users/:id/profile', (req, res, ctx) => {
    const { id } = req.params
    return res(
      ctx.status(200),
      ctx.json({
        id: Number(id),
        displayName: 'Test User',
        bio: 'Test bio',
        avatarUrl: 'https://example.com/avatar.jpg',
        themePreferences: { darkMode: true },
        socialLinks: { github: 'https://github.com/testuser' }
      })
    )
  }),

  // Webring endpoints
  rest.get('/api/webrings', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        {
          id: 1,
          name: 'Test Webring',
          description: 'A test webring',
          memberCount: 5
        }
      ])
    )
  }),

  // IPFS endpoints
  rest.post('/api/ipfs/upload', async (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        cid: 'QmTest123',
        size: 1024,
        filename: 'test.jpg'
      })
    )
  }),

  // Federation endpoints
  rest.get('/api/federation/activities', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        {
          id: 1,
          type: 'Create',
          actor: 'https://example.com/users/1',
          object: {
            type: 'Note',
            content: 'Test activity'
          },
          published: new Date().toISOString()
        }
      ])
    )
  }),

  // Error cases
  rest.get('/api/error-test', (req, res, ctx) => {
    return res(
      ctx.status(500),
      ctx.json({
        error: 'Internal Server Error'
      })
    )
  }),

  // Rate limiting test
  rest.get('/api/rate-limited', (req, res, ctx) => {
    return res(
      ctx.status(429),
      ctx.json({
        error: 'Too Many Requests',
        retryAfter: 60
      })
    )
  })
]
