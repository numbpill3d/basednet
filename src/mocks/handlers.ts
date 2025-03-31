import { http, HttpResponse } from 'msw'

export const handlers = [
  // Auth endpoints
  http.post('/api/auth/signin', () => {
    return HttpResponse.json({
      user: {
        id: 1,
        username: 'testuser',
        email: 'test@example.com'
      }
    })
  }),

  // User profile endpoints
  http.get('/api/users/:id/profile', ({ params }) => {
    const { id } = params
    return HttpResponse.json({
      id: Number(id),
      displayName: 'Test User',
      bio: 'Test bio',
      avatarUrl: 'https://example.com/avatar.jpg',
      themePreferences: { darkMode: true },
      socialLinks: { github: 'https://github.com/testuser' }
    })
  }),

  // Webring endpoints
  http.get('/api/webrings', () => {
    return HttpResponse.json([
      {
        id: 1,
        name: 'Test Webring',
        description: 'A test webring',
        memberCount: 5
      }
    ])
  }),

  // IPFS endpoints
  http.post('/api/ipfs/upload', async () => {
    return HttpResponse.json({
      cid: 'QmTest123',
      size: 1024,
      filename: 'test.jpg'
    })
  }),

  // Federation endpoints
  http.get('/api/federation/activities', () => {
    return HttpResponse.json([
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
  }),

  // Error cases
  http.get('/api/error-test', () => {
    return new HttpResponse(
      JSON.stringify({ error: 'Internal Server Error' }),
      { status: 500 }
    )
  }),

  // Rate limiting test
  http.get('/api/rate-limited', () => {
    return new HttpResponse(
      JSON.stringify({ 
        error: 'Too Many Requests',
        retryAfter: 60
      }),
      { 
        status: 429,
        headers: {
          'Retry-After': '60'
        }
      }
    )
  })
]
