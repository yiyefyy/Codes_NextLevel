import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { fetchData } from '../utils';

const LOGIN_API = 'http://localhost:8000/users/login'

export const authOptions: NextAuthOptions = {
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

        const user = await fetchData(LOGIN_API, requestOptions)
          
        if (!user) {
            return null;
        }

        return user;
      }
    })
  ],
  pages: {
    signIn: "/login",
    // signUp: 
  }
};

export default NextAuth(authOptions);
