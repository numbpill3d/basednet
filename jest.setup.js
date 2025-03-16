// Learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom'
import { TextDecoder, TextEncoder } from 'util'

// Mock global fetch
global.fetch = jest.fn()

// Mock Next.js router
jest.mock('next/router', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
    query: {},
    pathname: '/',
    asPath: '/',
  }),
}))

// Mock next/auth
jest.mock('next-auth/react', () => ({
  useSession: jest.fn(() => ({ data: null, status: 'unauthenticated' })),
  signIn: jest.fn(),
  signOut: jest.fn(),
  getSession: jest.fn(),
}))

// Mock IPFS client
jest.mock('ipfs-http-client', () => ({
  create: jest.fn(() => ({
    add: jest.fn(),
    cat: jest.fn(),
    pin: {
      add: jest.fn(),
      rm: jest.fn(),
    },
  })),
}))

// Setup MSW for API mocking
import { setupServer } from 'msw/node'
import { handlers } from './src/mocks/handlers'

export const server = setupServer(...handlers)

beforeAll(() => {
  // Start MSW server
  server.listen()
  
  // Polyfill TextEncoder/TextDecoder for Node.js environment
  global.TextEncoder = TextEncoder
  global.TextDecoder = TextDecoder
})

afterEach(() => {
  // Reset MSW handlers
  server.resetHandlers()
  
  // Clear all mocks
  jest.clearAllMocks()
})

afterAll(() => {
  // Clean up MSW server
  server.close()
})