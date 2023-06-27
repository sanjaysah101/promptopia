import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

import { config } from "@config";
import User from "@models/user";
import { connectToDB } from "@utils/database";

// interface IProfile {
//   email: string;
//   username: string;
//   image: string;
// }

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: config.GOOGLE_ID,
      clientSecret: config.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session({ session }) {
      const sessionUser = await User.findOne({
        email: session.user?.email,
      });
      session.user.id = sessionUser?._id?.toString();
      return session;
    },
    async signIn({profile}) {
      try {
        await connectToDB();
        // check if a user already exist
        const userExists = await User.findOne({
          email: profile?.email,
        });
        // console.log(profile);
        // console.log(profile.name);
        // if not, create a new document and save user in MongoDB
        if (!userExists) {
          await User.create({
            email: profile.email,
            username: profile.email?.trim().split("@")[0],
            image: profile.picture,
          });
        }
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
  }
});

export { handler as GET, handler as POST };
