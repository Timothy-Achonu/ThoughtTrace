import { Input } from "@/components/atoms/Input";
function NoteCreator() {
  return (
    <section className="sticky bottom-0">
      <Input
        type="text"
        placeholder="type a note"
        className="bg-primary-main
         font-extralight border-primary-main outline-none text-neutral-main"
      />
    </section>
  );
}

export default NoteCreator;
