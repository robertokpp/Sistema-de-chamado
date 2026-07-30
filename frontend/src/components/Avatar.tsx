import { twMerge } from "tailwind-merge";

type Props = {
  className?: string;
  classNameImg?: string
  avatar: string;
};

export function Avatar({ className, avatar, classNameImg }: Props) {
  const avatarUrl = "http://localhost:3333/uploads/avatar/";

  return (
    <div
      className={twMerge(
        "bg-blue-dark w-8 h-8 rounded-full flex justify-center items-center",
        className,
      )}
    >
      {avatar ? (
        <img
          className= {twMerge("object-cover w-8 h-8 rounded-full", classNameImg)}
          src={`${avatarUrl}${avatar}`}
          alt="avatar"
        />
      ) : (
        <span className="text-gray-500 text[14px]">SF</span>
      )}
    </div>
  );
}
