import { NextAuthOptions } from 'next-auth';
import { withTransaction } from '@/lib/db';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'IndieAuth',
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // This is a placeholder for IndieAuth
        // In production, you would implement proper IndieAuth flow
        if (credentials?.username) {
          return {
            id: "1",
            name: credentials.username,
            email: `${credentials.username}@example.com`,
          };
        }
        return null;
      }
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      try {
        if (session.user) {
          const result = await withTransaction(async (client) => {
            const userResult = await client.query(
              'SELECT * FROM users WHERE email = $1',
              [session.user?.email]
            );
            
            if (userResult.rows[0]) {
              return {
                ...session,
                user: {
                  ...session.user,
                  id: userResult.rows[0].id,
                  username: userResult.rows[0].username,
                },
              };
            }
            return session;
          });
          return result;
        }
        return session;
      } catch (error) {
        console.error('Error getting session:', error);
        return session;
      }
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    }
  },
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },
  debug: process.env.NODE_ENV === 'development',
  session: {
    strategy: "jwt",
  },
};
