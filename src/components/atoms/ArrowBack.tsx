// import useToggleSidebar from "@/store/toggleSidebar";
import { MdArrowBack } from "react-icons/md";
import { useRouter } from "next/navigation";

export const ArrowBack = () => {
  // const { toggleSidebar } = useToggleSidebar();
  const router = useRouter();

  return (
    <button
      type="button"
      className="flex text-white"
      // onClick={() => toggleSidebar()}
      onClick={() => router.back()}
    >
      {" "}
      <MdArrowBack />{" "}
    </button>
  );
};
