import { CreateThought } from "./components/CreateThought";
import DashboardLayout from "@/components/templates/DashboardLayout";

const Page = () => {
  return (
    <DashboardLayout header="Create Thought" addHeaderArrowBack={true}>
      <div className="h-full justify-center flex items-center">
        <CreateThought />
      </div>
    </DashboardLayout>
  );
};

export default Page;
