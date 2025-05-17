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
  shouldUsePending?: boolean;
}

const antIcon = <LoadingOutlined style={{ fontSize: 16 }} spin />;

export function SubmitButton({ children, className, shouldUsePending = true,  ...props }: Props) {
  const { pending, data } = useFormStatus();
  const isPending = shouldUsePending && pending;

  return (
    <Button
      intent={isPending ? "outline" : "primary"}
      disabled={isPending}
      outline={isPending}
      type="submit"
      {...props}
      aria-disabled={isPending}
      className={twMerge(
        "opacity-100 ",
       isPending ? "hover:bg-white" : "hover:border-accent-blue",
        className
      )}
    >
      {isPending ? (
        <Spin className="min-w-[42px]" indicator={antIcon} />
      ) : (
        <>{children}</>
      )}
    </Button>
  );
}
