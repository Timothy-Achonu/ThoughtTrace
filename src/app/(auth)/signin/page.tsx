"use client";
import { useSession } from "next-auth/react";
import { signIn, SignInOptions } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";

function SignInPage() {
  const searchParams = useSearchParams();
  const { data: session } = useSession();
  const callbackUrl = searchParams.get("callbackUrl") || "/";


  const router = useRouter();

  async function onSubmit(formData: FormData) {
    try {
      const email = formData.get("email");
      const password = formData.get("password");
      console.log({ email });
      console.log({ password });
      if (!email || !password) {
        return;
      }

      const credentials: SignInOptions = {
        email,
        password,
        callbackUrl,
        redirect: false,
      };

      const res = await signIn("credentials", credentials);
      if (res?.ok && res.url) {
        toast.success("Login successful, Redirecting...");
        return router.replace('/daily-questions');
      } else if (res?.error) {
        if (res?.error?.includes("CredentialsSignin")) {
          toast.error("Email or password incorrect");
        } else {
          toast.error(`Failed to login`);
        }
      }
    } catch (error: any) {
      toast.error(`Error: ${error}`);
      // toast.error(getError(error) || "Login failed! Please try again.");
    }
  }
  return (
    <section>
      <div>
        {/* On the left-hand side on  desktop screens, 
        there would be profound quotes about journal-keeping changing,
         with a smoth easing animation—they would be growing dim and growing bright*/}
        <h2 className="text-2xl font-semibold mb-4">Login</h2>
        <form action={onSubmit} className="text-black max-w-[550px] mx-auto">
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              email
            </label>
            <input
              type="text"
              id="email"
              name="email"
              className="w-full border rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Password
            </label>
            <input
              type="text"
              id="password"
              name="password"
              className="w-full border rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
          >
            Log in
          </button>
        </form>
      </div>
    </section>
  );
}

export default SignInPage;
