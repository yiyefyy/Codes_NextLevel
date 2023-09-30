import NextAuth from "next-auth";

declare module "next-auth" {
    interface User {
        firstName: String,
        userId: Number
        isAdmin: Boolean
    }

    interface Session {
        user: User & {
            firstName: String,
            userId: Number
            isAdmin: Boolean
        }
        token: {
            firstName: String,
            userId: Number
            isAdmin: Boolean
        }
    }
}