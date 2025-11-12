import { NextAuthOptions } from 'next-auth';
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
      },
      profile(profile: any) {
        return {
          id: profile.me || profile.id,
          name: profile.name || profile.me,
          email: profile.email,
          image: profile.photo || profile.image,
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
            [user.id || user.email]
          );

          if (result.rows.length === 0) {
            // Create new user
            const username = user.name?.toLowerCase().replace(/[^a-z0-9]/g, '') ||
                            user.email?.split('@')[0] ||
                            `user${Date.now()}`;

            await client.query(
              'INSERT INTO users (username, auth_domain, email) VALUES ($1, $2, $3)',
              [username, user.id || user.email, user.email]
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
    async session({ session, token }) {
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
