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
    <main className="w-full min-h-screen">
      <div className="bg-white text-black p-[5%] flex flex-col justify-center place-items-center flex-1 min-w-[MIN(100%,500px)]">
        {children}
      </div>
    </main>
  );
}
