"use client";
import { signIn, SignInOptions } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { Button } from "@/components/atoms/Button";
import Heading from "../atoms/Heading";
import { useFormik } from "formik";
import { signInValidationSchema } from "@/lib/utils/validationSchema";
import { Input } from "../atoms/Input";
import { SubmitButton } from "../atoms/SubmitButton";

function SignInForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";
  const { handleBlur, handleSubmit, handleChange, values, touched, errors } =
    useFormik({
      initialValues: { email: "", password: "" },
      validationSchema: signInValidationSchema,
      onSubmit: () => {},
    });

  const router = useRouter();

  async function onSubmit(formData: FormData) {
    try {
      const email = formData.get("email");
      const password = formData.get("password");

      handleSubmit();

      if (!email || !password) {
        toast.error("Please fill all fields!!!");
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
        return router.replace("/notes");
      } else if (res?.error) {

        if (res?.error?.includes("CredentialsSignin")) {
          // toast.error("Email or password incorrect");
          toast.error(`Failed to login`);
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
    <section className=" w-[90%] mx-auto">
      <div className="">
        
        <Heading className="text-2xl text-center font-semibold">
          Sign In
        </Heading>
        <form action={onSubmit} className="text-black w-full mt-6">
          <div className="mb-4 flex flex-col">
            <Input
              name="email"
              type="email"
              id="email"
              label="Email Address"
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.email && errors.email ? errors.email : ""}
              value={values.email}
              placeholder="user@example.com"
            />

            <Input
              name="password"
              id="password"
              type="password"
              label="Password"
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.password && errors.password ? errors.password : ""}
              value={values.password}
              placeholder="**********"
            />
          </div>
          <SubmitButton className="w-full">Sign in</SubmitButton>
          <Button
            isLink={true}
            href="/signup"
            intent="outline"
            className="mt-4 bg-transparent border-none mx-auto hover:text-accent-blue"
          >
            Sign up
          </Button>
        </form>
      </div>
    </section>
  );
}

export default SignInForm;
