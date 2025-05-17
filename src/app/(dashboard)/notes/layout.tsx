import { NotesProvider } from "./context";

async function layout({ children }: { children: React.ReactNode }) {
  return <NotesProvider>{children}</NotesProvider>;
}

export default layout;
