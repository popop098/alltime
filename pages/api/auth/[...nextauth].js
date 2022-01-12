import NextAuth from "next-auth"
import DiscordProvider from "next-auth/providers/discord"
import GoogleProvider from "next-auth/providers/google";
import clientPromise from "../../../lib/mongodb";
import {MongoDBAdapter} from "@next-auth/mongodb-adapter";
// import EmailProvider from "next-auth/providers/email";
export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    DiscordProvider({
      clientId: process.env.Discord_Id,
      clientSecret: process.env.Discord_Secret,
    }),
    // EmailProvider({
    //   server: process.env.EMAIL_SERVER,
    //   from: process.env.EMAIL_FROM,
    // })
    // ...add more providers here
    GoogleProvider({
      clientId: process.env.Google_ID,
      clientSecret: process.env.Google_Secret
    }),
    // EmailProvider({
    //   server: process.env.EMAIL_SERVER,
    //   from: process.env.EMAIL_FROM,
    // })
  ],
  theme:{
    colorScheme:'auto',
    brandColor:'#1a80ed',
    logo:''
  },
  secret:'test',
  adapter: MongoDBAdapter(clientPromise),

})
