"use client";
import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { cn } from "@/utils";
interface IInput
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {}

interface ITextArea
  extends React.DetailedHTMLProps<
    React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
  > {}

type InputProps = ITextArea & IInput;

interface IInputProps extends InputProps {
  isTextArea?: boolean;
  label?: string;
  labelStyle?: string;
  error?: string;
  touched?: boolean;
  containerClassName?: string;
}

export const Input = ({
  isTextArea,
  label,
  labelStyle,
  error,
  className,
  containerClassName,
  ...props
}: IInputProps) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const togglePassword = () => setIsPasswordVisible(!isPasswordVisible);

  return (
    <fieldset className= {cn("w-full flex flex-col gap-2", containerClassName)}>
      {label && (
        <label
          htmlFor={props.name}
          className={cn("flex items-center", labelStyle)}
        >
          {label}
          {props.required && (
            <span className="text-secondary mx-1 mt-2 font-body">*</span>
          )}
        </label>
      )}
      <div className="w-full flex flex-col relative justify-center ">
        {isTextArea ? (
          <textarea
            {...props}
            className={cn(
              `border text-lg py-3 px-4 rounded-[8px] flex-1 w-full  placeholder:font-body ${
                error
                  ? "text-error border-error"
                  : "border-[#CCC] text-[#020202]"
              }`,
              className
            )}
          />
        ) : (
          <>
            {props.type === "checkbox" ? (
              <CheckboxInput {...props} />
            ) : (
              <input
                {...props}
                type={`${
                  props.type === "password" && isPasswordVisible
                    ? "text"
                    : props.type
                }`}
                className={cn(
                  `border py-3 px-4 text-lg rounded-[8px] flex-1 w-full placeholder:font-body ${
                    props.name === "password" ? "pr-12" : ""
                  } ${
                    error
                      ? "text-error border-error"
                      : "border-[#CCC] text-[#020202]"
                  }`,
                  className
                )}
              />
            )}

            {props.name?.toLowerCase()?.includes('password') && props.value && (
              <span
                className={`text-[#C0C0C0] absolute right-3 top-[50%] -translate-y-[50%] text-2xl px-2`}
                onClick={togglePassword}
              >
                {isPasswordVisible ? (
                  <AiOutlineEyeInvisible />
                ) : (
                  <AiOutlineEye />
                )}
              </span>
            )}
          </>
        )}
      </div>
      <span
        className={`mt-[2px] ${
          error ? "" : "opacity-0"
        } text-error max-w-fit break-words text-sm`}
      >
        {error}
      </span>
    </fieldset>
  );
};

export const CheckboxInput = (props: any) => (
  <input
    type="checkbox"
    {...props}
    className="w-[23px] h-[19px] rounded-[4px] border border-[#767778] cursor-pointer"
  />
);
