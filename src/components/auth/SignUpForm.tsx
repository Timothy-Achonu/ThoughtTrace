"use client";
import { signIn, SignInOptions } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { signup } from "@/lib/actions/authActions";
import { useFormik } from "formik";
import { signUpValidationSchema } from "@/lib/utils/validationSchema";
import Heading from "../atoms/Heading";
import { Input } from "../atoms/Input";
import { SubmitButton } from "../atoms/SubmitButton";
import { Button } from "..";
function SignUpForm() {
  const { handleBlur, handleSubmit, handleChange, values, touched, errors } =
    useFormik({
      initialValues: { email: "", password: "" , confirmPassword: ''},
      validationSchema: signUpValidationSchema,
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
      if (password.toString()?.length < 8) {
        toast.error("Password must be at least 8 characters long");
      }

      const credentials: SignInOptions = {
        email,
        password,
        // callbackUrl,
        redirect: false,
      };
      const signUpRes = await signup(email as string, password as string);
      if (signUpRes.error) {
        if (signUpRes.error.includes("auth/email-already-in-use")) {
          toast.error("Email already in use");
        } else {
          toast.error("Failed to signup");
        }
        return;
      }

      const res = await signIn("credentials", credentials);
      if (res?.ok && res.url) {
        toast.success("Login successful, Redirecting...");
        return router.replace("/daily-questions");
      } else if (res?.error) {
        if (res?.error?.includes("CredentialsSignin")) {
          toast.error("Email or password incorrect");
        } else {
          toast.error(`Failed to login`);
        }
      }
    } catch (error: any) {
      console.log(error);
    }
  }
  return (
    <section className=" w-[90%] mx-auto">
      <div>
        <Heading className="text-2xl text-center font-semibold">
          Sign Up
        </Heading>{" "}
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
            <Input
              name="confirmpassword"
              id="confirmpassword"
              type="password"
              label="confirm password"
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.confirmPassword && errors.confirmPassword ? errors.confirmPassword : ""}
              value={values.confirmPassword}
              placeholder="**********"
            />
          </div>
          <SubmitButton className="w-full">Sign up</SubmitButton>
          <Button
            isLink={true}
            href="/signin"
            intent="outline"
            className="mt-4 bg-transparent border-none mx-auto hover:text-accent-blue"
          >
            Sign in
          </Button>
        </form>
      </div>
    </section>
  );
}

export default SignUpForm;
