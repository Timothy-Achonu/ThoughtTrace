import DashboardLayout from "@/components/templates/DashboardLayout";
import NoteCreator from "@/components/molecules/NoteCreator";

function page() {
  return (
    <DashboardLayout header="Notes" footer={<NoteCreator />}>
      <section className="flex flex-col justify-between ">
        <div>
          <p> Here, your notes will go...</p>
        </div>
      </section>
    </DashboardLayout>
  );
}

export default page;
