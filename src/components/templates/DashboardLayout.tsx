import { ClassNameValue, twMerge } from "tailwind-merge";

type DashboardLayoutPropsType = {
    children: React.ReactNode;
  subHeader?: React.ReactNode | string;
  header?: React.ReactNode | string;
  footer?: React.ReactNode | string;
  headerContainerClassName?: ClassNameValue;
  mainContainerClassName?: ClassNameValue;
}
function DashboardLayout({children, header, subHeader, footer}:DashboardLayoutPropsType) {
 
  return (
    <section className={`bg-primary-footer flex-1 px-5 flex flex-col`}>
      {header && (
        <div
          className={twMerge(
            `sticky grid items-center rounded-xl shadow-sm px-4 md:px-8  py-4 top-0 
                left-0 right-0 z-10 w-full psx-[MIN(32px,2%)]`,
          )}
        >
          {typeof header == "string" ? (
            <>
              <p className="text-3xl text-neutral-main font-bold capitalize">
                {header}
              </p>
              {subHeader && (
                <p className="text-neutral-main text-xs sm:text-sm md:text-base mt-1">
                  {subHeader}
                </p>
              )}
            </>
          ) : (
            <>{header}</>
          )}
        </div>
      )}
      <main className="overflow-y-scroll flex-1">
      {children}
      </main>
      {footer && (
        <div
          className={twMerge(
            `sticky grid items-center rounded-xl shadow-sm px-4 md:px-8  py-4 bottom-0 
                left-0 right-0 z-10 w-full psx-[MIN(32px,2%)]`,
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
  )
}

export default DashboardLayout
