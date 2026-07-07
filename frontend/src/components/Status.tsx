import { twMerge } from "tailwind-merge";

const variants = {
  active: "bg-feedback-done/20 text-feedback-done w-13.25",
  inactive: "bg-feedback-danger/20 text-feedback-danger w-[62px]",
};

type Props = {
  children: React.ReactNode;
  active: boolean;
  className: string
};

export function Status({ children, active, className}: Props) {
  return (
    <li
      className={twMerge("px-3 py-1.5 rounded-[999px] flex justify-center items-center h-7",
        active ? variants.active : variants.inactive , className
      )}
    >
      {children}
    </li>
  );
}