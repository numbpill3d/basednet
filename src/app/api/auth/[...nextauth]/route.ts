import { NextAuthOptions } from 'next-auth';
import NextAuth from 'next-auth/next';
import { withTransaction } from '@/lib/db';

export const authOptions: NextAuthOptions = {
  providers: [
    {
      id: 'indieauth',
      name: 'IndieAuth',
      type: 'oauth',
      authorization: {
        url: 'https://indieauth.com/auth',
        params: { scope: 'profile email' }
      },
      token: {
        url: 'https://tokens.indieauth.com/token',
      },
      userinfo: {
        url: 'https://indieauth.com/userinfo',
        async request({ tokens, client }) {
          // IndieAuth specific user info handling
          return {
            id: tokens.me,
            name: tokens.name || tokens.me,
            email: tokens.email,
            image: tokens.photo,
          };
        },
      },
      profile(profile) {
        return {
          id: profile.id,
          name: profile.name,
          email: profile.email,
          image: profile.image,
        };
      },
      clientId: process.env.INDIE_AUTH_CLIENT_ID,
      clientSecret: process.env.INDIE_AUTH_CLIENT_SECRET,
    },
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      try {
        await withTransaction(async (client) => {
          // Check if user exists
          const result = await client.query(
            'SELECT * FROM users WHERE auth_domain = $1',
            [profile.id]
          );

          if (result.rows.length === 0) {
            // Create new user
            await client.query(
              'INSERT INTO users (username, auth_domain, email) VALUES ($1, $2, $3)',
              [profile.name, profile.id, profile.email]
            );

            // Create empty profile
            await client.query(
              'INSERT INTO profiles (user_id) VALUES (currval(\'users_id_seq\'))'
            );
          }
        });
        return true;
      } catch (error) {
        console.error('Error during sign in:', error);
        return false;
      }
    },
    async session({ session, user }) {
      try {
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
      } catch (error) {
        console.error('Error getting session:', error);
        return session;
      }
    },
  },
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },
  debug: process.env.NODE_ENV === 'development',
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };