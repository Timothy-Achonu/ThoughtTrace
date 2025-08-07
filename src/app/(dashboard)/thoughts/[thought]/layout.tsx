import { MessagesProvider } from "./context";
async function layout({ children }: { children: React.ReactNode }) {
  return <MessagesProvider>{children}</MessagesProvider>;
}

export default layout;
