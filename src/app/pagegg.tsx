import Heading from "@/components/atoms/Heading";
import { Button } from "@/components/atoms/Button";

import { ButtonProps } from "@/components/atoms/Button";

const buttonOptions: ButtonProps["intent"][] = ["primary", "outline", "ghost"];
const buttonSizes: ButtonProps["size"][] = ["small", "medium", "large"];

export default function Home() {
  return (
    <main
      className="flex min-h-screen flex-col 
    items-center gap-3 p-14"
    >
      <Heading className="text-primary">WishSomeone</Heading>
      <div className="flex flex-col gap-3">
        {buttonOptions.map((option) => {
          return (
            <>
              <div key={option} className="flex row gap-2">
                {buttonSizes.map((size, index) => {
                  return (
                    <Button
                      key={option}
                      intent={option}
                      size={size}
                      disabled={index === 2}
                      className="shadow-btn-primary"
                    >
                      <span>Learn More</span>
                      <span>&rarr;</span>
                    </Button>
                  );
                })}
              </div>
            </>
          );
        })}
        <Heading>Icons</Heading>
        {buttonOptions.map((option) => {
          return (
            <>
              <div key={option} className="flex row gap-2">
                {buttonSizes.map((size, index) => {
                  return (
                    <Button
                      key={option}
                      btnType={"icon"}
                      intent={option}
                      size={size}
                      disabled={index === 2}
                    >
                      <span>&rarr;</span>
                    </Button>
                  );
                })}
              </div>
            </>
          );
        })}
      </div>
    </main>
  );
}
