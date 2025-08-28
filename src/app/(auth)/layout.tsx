import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options";
import { permanentRedirect } from "next/navigation";
import { AuthLayoutLeftSide } from "./components/left-side";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(options);
  if (session) {
    permanentRedirect("/thoughts");
  }

  return (
    <main className="w-full min-h-screen flex ">
    <AuthLayoutLeftSide/>
      <div
        className="bg-white text-black min-h-screen flex 
      flex-col justify-center place-items-center w-full overflow-y-scroll"
      >
        {children}
      </div>
    </main>
  );
}
