import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options";
import { permanentRedirect } from "next/navigation";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(options);
  if (session) {
    permanentRedirect("/notes");
  }
  console.log("In auth layout: NEXTAUTH_URL:", process.env.NEXTAUTH_URL);

  return (
    <main className="w-full min-h-screen flex ">
      {/* On the left-hand side on  desktop screens, 
        there would be profound quotes about journal-keeping changing,
         with a smoth easing animation—they would be growing dim and growing bright*/}
      <div
        className="w-full md:flex flex-col 
      justify-center place-items-center hidden "
      >
        It&apos;s good to keep Journals
      </div>
      check 1
      <div
        className="bg-white text-black min-h-screen flex 
      flex-col justify-center place-items-center w-full overflow-y-scroll"
      >
        {children}
      </div>
    </main>
  );
}
