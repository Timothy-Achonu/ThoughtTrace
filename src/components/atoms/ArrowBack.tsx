import useToggleSidebar from "@/store/toggleSidebar";
import { MdArrowBack } from "react-icons/md";


export const ArrowBack = () => {
  const { toggleSidebar } = useToggleSidebar();

  return (
    <button
      type="button"
      className="flex text-white"
      onClick={() => toggleSidebar()}
    >
      {" "}
      <MdArrowBack />{" "}
    </button>
  );
};
