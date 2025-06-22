import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Credential from "next-auth/providers/credentials"
import Google from "next-auth/providers/google";
export const { auth, handlers, signIn } = NextAuth({
  providers: [
    GitHub,
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
      authorization: {
        params: {
          redirect_uri: process.env.GOOGLE_REDIRECT_URI,
          response_type:"code",
          scope:"openid email profile",
          state:"SECURE_RANDOM_STRING",
          access_type:"offline",
          prompt:"consent",
          url: "https://accounts.google.com/o/oauth2/v2/auth",
        }
      }
    }),
    Credential({
      credentials: {
        email: {
          // type: "email",
          // label: "Email",
          // placeholder: "johndoe@gmail.com",
        },
        password: {
          // type: "password",
          // label: "Password",
          // placeholder: "*****",
        },
      },
      authorize: async (credentials) => {
        const email = "admin@admin.com"
        const password = "1234"
 
        if (credentials.email === email && credentials.password === password) {
          // No user found, so this is their first attempt to login
          // Optionally, this is also the place you could do a user registration
          return {email, password}
        } else {
            throw new Error("密码错误");
        }
    },
    }),
  ],
});
