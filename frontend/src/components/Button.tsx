import { twMerge } from "tailwind-merge";

type Props = React.ComponentProps<"button"> & {
  isLoading?: boolean;
};

export function Button({ isLoading, className, children, ...Rest }: Props) {
  return (
    <button
      disabled={isLoading}
      className={twMerge(
        "w-full bg-gray-200 px-4 py-2 text-white rounded-[5px] cursor-pointer leading-5 font-bold disabled:opacity-15 disabled:cursor-progress",
        className,
      )}
      {...Rest}
    >
      {children}
    </button>
  );
}
