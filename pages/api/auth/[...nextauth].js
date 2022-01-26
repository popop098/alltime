import NextAuth from "next-auth"
import DiscordProvider from "next-auth/providers/discord"
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import clientPromise from "../../../lib/mongodb";
import {MongoDBAdapter} from "@next-auth/mongodb-adapter";
//import axios from "axios";
// import EmailProvider from "next-auth/providers/email";
import fetch from "isomorphic-unfetch";
import {useState} from "react";

export default NextAuth({
    // Configure one or more authentication providers
    providers: [
        CredentialsProvider({
            // 수정
            type: 'credentials',
            async authorize(credentials, req) {
                const res = await fetch("http://localhost:3000/api/login", {
                    method: "POST",
                    body: JSON.stringify({
                        "id": credentials.id,
                        "pwd": credentials.pwd
                    }),
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json"
                    }
                })
                if (res.status ===200) {
                    return res.json()
                }
                return null;
                // const user = await res.json()
                // console.log(user)
                // // If no error and we have user data, return it
                // if (user) {
                //   return user
                // }
                // // Return null if user data could not be retrieved
                // return null;
            }
        }),
        // DiscordProvider({
        //   clientId: process.env.Discord_Id,
        //   clientSecret: process.env.Discord_Secret,
        // }),
        // EmailProvider({
        //   server: process.env.EMAIL_SERVER,
        //   from: process.env.EMAIL_FROM,
        // })
        // ...add more providers here
        // GoogleProvider({
        //   clientId: process.env.Google_ID,
        //   clientSecret: process.env.Google_Secret
        // }),
        // EmailProvider({
        //   server: process.env.EMAIL_SERVER,
        //   from: process.env.EMAIL_FROM,
        // })
    ],
    theme: {
        colorScheme: 'auto',
        brandColor: '#1a80ed',
        logo: ''
    },
    pages: {
        signIn: '/login',
    },
    callbacks: {
        // jwt: ({token, user}) => {
        //     // first time jwt callback is run, user object is available
        //     if (user) {
        //         token.id = user.data.id
        //         token.email = user.data.email
        //         token.role = user.data.role
        //     }
        //     console.log(token)
        //     return token;
        // },
        // session: ({session, token,user}) => {
        //     console.log(user)
        //     if (token) {
        //         session.user.id = user.data.id
        //         session.user.email = user.data.email
        //         session.user.role = user.data.role
        //     }
        //
        //     return session;
        // },
        // async session({ session, user, token }) {
        //     console.log(user)
        //     if (token) {
        //         session.user.id = user.data.id
        //         session.user.email = user.data.email
        //         session.user.role = user.data.role
        //     }
        //     return session
        // },
        // async jwt({ token, user, account, profile, isNewUser }) {
        //     // if (user) {
        //     //     token.id = user.data.id
        //     //     token.email = user.data.email
        //     //     token.role = user.data.role
        //     // }
        //     if (user) {
        //         // `user` will be the return value of `authorize` if user first login.
        //
        //         return user;
        //     } else {
        //         // after login, `token` is the decoded jwt from current session-token.
        //         token.id = user.data.id
        //         token.email = user.data.email
        //         token.role = user.data.role
        //         return token;
        //     }
        // },
        // async session(session, token) {
        //     session.accessToken = token.accessToken;
        //     session.user = token.user;
        //     return session;
        // },
        // async jwt(token, user, account, profile, isNewUser) {
        //     if (user) {
        //         token.accessToken = user._id;
        //         token.user = user;
        //     }
        //     return token;
        // },
        // jwt: ({ token, user }) => {
        //     // first time jwt callback is run, user object is available
        //     if (user) {
        //         token.id = user.id;
        //     }
        //
        //     return token;
        // },
        // session: ({ session, token }) => {
        //     if (token) {
        //         session.id = token.id;
        //     }
        //
        //     return session;
        // },
        // async jwt(token, user, account, profile, isNewUser) {
        //     token.userId = 123;
        //     token.test = "test";
        //     return token;
        // },
        // async session(session, userOrToken) {
        //     session.user.userId = userOrToken.userId;
        //     session.user.test = userOrToken.test;
        //     return session
        // },
        // async redirect({ url, baseUrl }) {
        //     if (url.startsWith(baseUrl)) return url
        //         // Allows relative callback URLs
        //     else if (url.startsWith("/")) return new URL(url, baseUrl).toString()
        //     return baseUrl
        // },
        // redirect({url, baseUrl}) {
        //     if (url.startsWith(baseUrl)) return url
        //     // Allows relative callback URLs
        //     else if (url.startsWith("/")) return new URL(url, baseUrl).toString()
        //     return baseUrl
        // }
        // async signIn({ user, account, profile, email, credentials }) { return true },
        async redirect({ url, baseUrl }) { return baseUrl },
        async session({ session, token, user }) {
            if (token) {
                session.user.id = token.id
                session.user.email = token.email
                session.user.role = token.role
            }

            return session;
        },
        async jwt({ token, user, account, profile, isNewUser }) {
            if (user) {
                token.id = user.data.id
                token.email = user.data.email
                token.role = user.data.role
            }
            return token
        }
    },
    jwt: {
        secret: "test",
        //encryption: true,
    },
    session: {
        strategy: "jwt",
        // Seconds - How long until an idle session expires and is no longer valid.
        //maxAge: 30 * 24 * 60 * 60, // 30 days
    },
    secret: 'test',
    adapter: MongoDBAdapter(clientPromise),

})
