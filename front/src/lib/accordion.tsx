import { CheckCheck } from "lucide-react";
import { ReactNode, useState } from "react";
import { ucwords } from "./utils";
type AccordionProps = {
  title?: string;
  children: ReactNode;
  active?: boolean | undefined;
  msg?: string;
  className: string;
};
export const Accordion = ({
  title,
  children,
  className,
  active,
  msg,
}: AccordionProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={className}>
      <button
        className="w-full py-1 px-6 text-left flex justify-between items-center"
        onClick={() => toggleAccordion()}
      >
        <div className={`flex w-full ${isOpen ? "border-b-2" : ""}`}>
          <div className={`font-semibold flex-1`}>{title}:</div>
          {active && <CheckCheck className="mr-1" />}
          {msg && (
            <div className="flex-1 text-center border-2 font-semibold">
              {ucwords(msg)}
            </div>
          )}
        </div>
        <span className="text-gray-600">
          {isOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 transform rotate-180"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 13a1 1 0 0 1-.707-.293l-4-4a1 1 0 1 1 1.414-1.414L10 10.586l3.293-3.293a1 1 0 1 1 1.414 1.414l-4 4A1 1 0 0 1 10 13z"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 13a1 1 0 0 1-.707-.293l-4-4a1 1 0 1 1 1.414-1.414L10 10.586l3.293-3.293a1 1 0 1 1 1.414 1.414l-4 4A1 1 0 0 1 10 13z"
              />
            </svg>
          )}
        </span>
      </button>
      <div className={`px-6 py-1 ${isOpen ? "" : "hidden"}`}>{children}</div>
    </div>
  );
};
