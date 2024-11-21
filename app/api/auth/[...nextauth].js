import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"

GoogleProvider({
  clientId: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  profile() {
    return {
        id
    }
  },
})

export const authOptions = {
    providers: [GoogleProvider]
}

export default NextAuth(authOptions)