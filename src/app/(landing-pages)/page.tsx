import Heading from "@/components/atoms/Heading";
import { handleGetDocs } from "../../lib/dailyQuestions/services";
import { options } from "../api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";

async function HomePage() {
  const session = await getServerSession(options)
  console.log(session)
  const data = await handleGetDocs();

  return (
    <section className="">
      <Heading className="text-center">Thought Trace</Heading>
    </section>
  );
}
export default HomePage;
