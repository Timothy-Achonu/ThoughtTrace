import { cn } from "@/utils";

interface Props
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLHeadingElement>,
    HTMLHeadingElement
  > {}

const Heading: React.FC<Props> = ({ children, className, ...props }) => {
  return (
    <h2
      {...props}
      className={cn(
        `text-h-3 text-[#020202] raleway-font font-[900]`,
        className
      )}
    >
      {children}
    </h2>
  );
};

export default Heading;
 