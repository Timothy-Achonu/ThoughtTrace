"use client";
import { ClassNameValue, twMerge } from "tailwind-merge";
import { MdArrowBack } from "react-icons/md";
import useToggleSidebar from "@/store/toggleSidebar";

type DashboardLayoutPropsType = {
  children: React.ReactNode;
  subHeader?: React.ReactNode | string;
  header?: React.ReactNode | string;
  footer?: React.ReactNode | string;
  headerContainerClassName?: ClassNameValue;
  mainContainerClassName?: ClassNameValue;
  footerCustomClassName?: ClassNameValue;
  addHeaderArrowBack?: boolean;
};
function DashboardLayout({
  children,
  header,
  subHeader,
  footer,
  mainContainerClassName,
  footerCustomClassName,
  addHeaderArrowBack,
}: DashboardLayoutPropsType) {

  return (
    <section
      className={twMerge(
        `bg-secondary flex-1 md:px-5 px-3 flex flex-col h-screen`,
        mainContainerClassName
      )}
    >
      {header && (
        <header
          className={twMerge(
            `sticky grid items-center rounded-xl shadow-sm px-4 md:px-8  py-4 top-0 
                left-0 right-0 z-10 w-full`
          )}
        >
          {typeof header == "string" ? (
            <div className="flex items-center gap-4">
              {addHeaderArrowBack && <ArrowBack />}
              <div>
                <p className="text-2xl text-neutral-main font-bold capitalize">
                  {header}
                </p>
                {subHeader && (
                  <p className="text-neutral-main text-xs sm:text-sm md:text-base mt-1">
                    {subHeader}
                  </p>
                )}
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              {" "}
              {addHeaderArrowBack && <ArrowBack />}
              {header}
            </div>
          )}
        </header>
      )}
      <main className="overflow-y-scroll flex-1 ">{children}</main>
      {footer && (
        <div
          className={twMerge(
            `sticky grid items-center rounded-xl shadow-sm px-0 md:px-8  py-4 bottom-0 
                left-0 right-0 z-10 w-full psx-[MIN(32px,2%)]`,
            footerCustomClassName
          )}
        >
          {typeof footer == "string" ? (
            <>
              <p className="text-3xl text-neutral-main font-bold capitalize">
                {footer}
              </p>
            </>
          ) : (
            <>{footer}</>
          )}
        </div>
      )}
    </section>
  );
}

export default DashboardLayout;

const ArrowBack = () => {
  const { toggleSidebar } = useToggleSidebar();

  return (
    <button
      type="button"
      className="flex sm:hidden text-white"
      onClick={() => toggleSidebar()}
    >
      {" "}
      <MdArrowBack />{" "}
    </button>
  );
};
