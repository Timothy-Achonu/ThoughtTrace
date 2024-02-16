"use client";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { Button } from "@/components/atoms/Button";
import { useFormStatus } from "react-dom";
import { twMerge } from "tailwind-merge";
interface Props
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  href?: string;
  small?: boolean;
  large?: boolean;
  scroll?: boolean;
  outline?: boolean;
  className?: string;
}

const antIcon = <LoadingOutlined style={{ fontSize: 16 }} spin />;

export function SubmitButton({ children, className, ...props }: Props) {
  const { pending, data } = useFormStatus();

  return (
    <Button
      intent={pending ? "outline" : "primary"}
      disabled={pending}
      outline={pending}
      type="submit"
      {...props}
      aria-disabled={pending}
      className={twMerge(
        "opacity-100 ",
        pending ? "hover:bg-white" : "hover:border-accent-blue",
        className
      )}
    >
      {pending ? (
        <Spin className="min-w-[42px]" indicator={antIcon} />
      ) : (
        <>{children}</>
      )}
    </Button>
  );
}
