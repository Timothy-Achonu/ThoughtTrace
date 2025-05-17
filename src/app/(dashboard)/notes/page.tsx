"use client";
import DashboardLayout from "@/components/templates/DashboardLayout";
import NoteCreator from "@/app/(dashboard)/notes/components/NoteCreator";
import { NotesGroupedByDateType, NoteType } from "@/lib/notes";
import { useNotesContext } from "./context";
import { SkeletonLoader } from "@/components/ui";
import { getFormattedDate } from "@/utils";

function NotesPage() {
  const { stateNotes, isLoadingNotes } = useNotesContext();

  return (
    <>
      <DashboardLayout
        header="Notes"
        footer={<NoteCreator />}
        addHeaderArrowBack
      >
        {/* <div className="flex-1"> */}
        {isLoadingNotes ? (
          <div className="flex flex-col items-end gap-6 pr-4">
            {new Array(5).fill("k").map((item) => (
              <>
                <SkeletonLoader
                  key={crypto.randomUUID()}
                  width="150px"
                  height="25px"
                />
              </>
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-6 pr-4">
            {(stateNotes as NotesGroupedByDateType[])?.map(
              ({ day, notes }, index) => {
                return (
                  <ul className="" key={index}>
                    {" "}
                    <p className="bg-blue-700 py-2 px-3 rounded-md"> {day} </p>
                    <li className="flex flex-col gap-6 items-end mt-6">
                      {notes.map((note, index) => {
                        return (
                          <div
                            key={index}
                            className="bg-primary-main rounded-md px-2 py-1 relative flex gap-2 max-w-[24rem]"
                          >
                            <p className=""> {note.body} </p>

                            <span className=" bottom-1 right-2 text-[0.625rem] self-end">
                              {" "}
                              {note.createdAt
                                ? getFormattedDate(note.createdAt).time
                                : "*"}{" "}
                            </span>
                          </div>
                        );  
                      })}
                    </li>
                  </ul>
                );  
              }
            )}
          </div>
        )}
        {/* </div> */}
      </DashboardLayout>
    </>
  );
}
export default NotesPage;
