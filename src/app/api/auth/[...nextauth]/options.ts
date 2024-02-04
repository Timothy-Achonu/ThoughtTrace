import type { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { signin } from "@/lib/services/authServices";


// Some random ideas. I think I kind of get this next-auth, firebase stuff:

//So you import a sign-in(SIGN-UP FUNCTION TOO MF!!) function from next-auth into your signin component and then you pass credentials(form values) to it-
//- I guess it then calls that authorize function in the options file. And then in that options file, the credentials is checked against
//- a Database if the user exists, a positive response is sent back. By the way, your signin component is going to receive this positive response
//- from the options file, because actually the sigin function from next-auth will sort of act as your normal signin function you've created your self
//- in the sign in component(I don't know if you get me, but I hope you do, you can check learnwave's sigin component for a clearer picture)

//Now, with firebase we just have to make sure that the Database that the options file is checking the credentials against is our firebase Database

// Now for signup, I think it can be ran normally, so do your normal sign up and then when  successfully call the signin function from next-auth
//- and then pass the neccessary credentials, then the sigin function from next-auth call your signin function and then sign the user in normally(I hope you get)

//Hold on! it's like firebase auth automatically handles persistent login too. But the issue is: Would I be able to access the users session in a server component?

export const options: NextAuthOptions = {
  pages: {
    signIn: "/signin",
  },
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "email:",
          type: "text",
          placeholder: "your-email",
        },
        password: {
          label: "Password:",
          type: "password",
          placeholder: "***",
        },
      },
      async authorize(credentials, req) {
        if (
          !credentials ||
          typeof credentials == "undefined" ||
          !credentials?.email ||
          !credentials.password
        ) {
          return null;
        }

        const {res, error} = await signin( credentials.email, credentials.password,);
        console.log(res)
        console.log(error)
          // const res = { id: "42", name: "Ifechi", password: "nextauth" };

        if (res) {
          return res;
        }else {
          return null
        }
        // throw new Error(JSON.stringify(error));
      },

      // async authorize(credentials) {
        //This is where you need to retrieve user data-
        //to verify with credentials
        //Docs: https://next-auth.js.org/configuration/providers/credentials
      //   console.log({ credentials });
      //   const user = { id: "42", name: "Ifechi", password: "nextauth" };
      //   if (
      //     credentials?.email === user.name &&
      //     credentials?.password === user.password
      //   ) {
      //     return user;
      //   } else {
      //     return null;
      //   }
      // },
    }),
  ],
};
