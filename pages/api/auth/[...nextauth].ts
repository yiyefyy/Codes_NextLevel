import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { fetchData } from '../utils';

const LOGIN_API = 'http://localhost:8000/users/login'

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt'
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "jsmith@psa.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials?.password) {
            return null;
        }

        const requestOptions = {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(credentials)
          };

        return fetchData(LOGIN_API, requestOptions)
      }
    })
  ],
  callbacks: {
    async jwt({token, user}) {
      if (user) {
        return {
          ...token,
          userId: user.userId,
          firstName: user.firstName,
          isAdmin: user.isAdmin
        }
      }
      
      return token;
    },
    async session({session, token}) {
      return {
        ...session,
        user: {
          ...session.user,
          userId: token.userId,
          firstName: token.firstName,
          isAdmin: token.isAdmin
        }
      }
    }
  },
  pages: {
    signIn: "/login",
  },
};

export default NextAuth(authOptions);
