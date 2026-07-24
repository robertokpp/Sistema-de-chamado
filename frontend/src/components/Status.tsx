import { twMerge } from "tailwind-merge";

import iconCheck from "../assets/icon-circleCheckGreen.svg";
import iconBan from "../assets/icon-banRed.svg"

const variants = {
  active: "bg-feedback-done/20 text-feedback-done",
  inactive: "bg-feedback-danger/20 text-feedback-danger",
  progress: "bg-feedback-danger/20 text-feedback-info",
};

type Props = {
  children: React.ReactNode;
  active: boolean;
  className: string;
};

export function Status({ children, active, className }: Props) {
  return (
    <div>
      <span
        className={twMerge(
          "px-3 py-1.5 w-fit rounded-[999px] flex justify-center items-center h-7 max-lg:hidden ",
          active ? variants.active : variants.inactive,
          className,
        )}
      >
        {children}
      </span>
      <span
        className={twMerge(
          "p-1 w-fit rounded-[999px] flex justify-center items-center lg:hidden ",
          active ? variants.active : variants.inactive,
          className,
        )}
      >
        {active ? (
          <img src={iconCheck} alt="" />
        ) : (
          <img src={iconBan} alt="" />
        )}
      </span>
    </div>
  );
}
