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
    permanentRedirect("/daily-questions");
  }
  return (
    <main className="w-full min-h-screen flex ">
      <div
        className="w-full md:flex flex-col 
      justify-center place-items-center hidden "
      >
        It&apos;s good to keep Journals
      </div>
      <div
        className="bg-white text-black min-h-screen flex 
      flex-col justify-center place-items-center w-full overflow-y-scroll"
      >
        {children}
      </div>
    </main>
  );
}
