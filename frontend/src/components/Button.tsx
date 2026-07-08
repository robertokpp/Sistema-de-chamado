import { twMerge } from "tailwind-merge";

type Props = React.ComponentProps<"button"> & {
  isLoading?: boolean;
  svg?: string;
};

export function Button({
  isLoading,
  className,
  svg,
  children,
  ...Rest
}: Props) {
  return (
    <button
      disabled={isLoading}
      className={twMerge(
        "bg-gray-200 px-2 py-2 text-white rounded-[5px] cursor-pointer font-bold disabled:opacity-15 disabled:cursor-progress flex gap-1 justify-center items-center",
        className,
      )}
      {...Rest}
    >
      {svg && <img src={svg} alt={svg} className="w-4.5 h-4.5" />}

      {children}
    </button>
  );
}
