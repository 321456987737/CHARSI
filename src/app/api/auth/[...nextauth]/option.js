import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/model/User";
import bcrypt from "bcryptjs";
import {connectDB} from "@/lib/Connectdb"
export const authOptions = {
  providers: [
    // ✅ Google OAuth
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),

    // ✅ Custom Credentials (email, username, password)
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "johndoe" },
        email: { label: "Email", type: "email", placeholder: "example@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await connectDB();

        const { email, password } = credentials;

        const user = await User.findOne({ email });
        if (!user) throw new Error("No user found with this email");

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) throw new Error("Invalid password");

        return {
          id: user._id,
          username: user.username,
          email: user.email,
        };
      },
    }),
  ],

  // ✅ Custom callbacks for JWT & session
  callbacks: {
     async signIn({ user, account, profile }) {
    if (account.provider === "google") {
      await connectDB();

      const existingUser = await User.findOne({ email: user.email });
      if (!existingUser) {
        await User.create({
          email: user.email,
          username: user.name || profile.name,
          password:"google-oauth",
          // No password for Google users
        });
      }


    }
    return true;
  },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.username = user.name;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
  if (token && session?.user) {
    session.user.id = token.id;
    session.user.username = token.username;
    session.user.email = token.email;
  }
  return session;
},
 async redirect({ url, baseUrl }) {
    // Redirect to homepage or any other route
    return baseUrl + "/userdashboard"; // 👈 change to your desired page
  },

  },

  pages: { signIn: "/signup", error: "/signup" },

  session: {
    strategy: "jwt",
  },

  secret: process.env.NEXTAUTH_SECRET,
};
