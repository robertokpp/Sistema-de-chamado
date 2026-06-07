import { twMerge } from "tailwind-merge";

type Props = React.ComponentProps<"button">;

export function Button({ className, children, ...Rest }: Props) {
  return (
    <button
      className={twMerge(
        "w-full bg-gray-200 px-4 py-2 text-white rounded-[5px] cursor-pointer leading-5 font-bold",
        className,
      )}
      {...Rest}
    >
      {children}
    </button>
  );
}
