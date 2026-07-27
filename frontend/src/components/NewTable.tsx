type Props = {
  children: React.ReactNode;
  title: { name: string; className?: string }[];
};

export function NewTable({ children, title }: Props) {
  return (
    <ul className="flex flex-col border border-gray-500 rounded-2xl [&_li]:p-3 [&_li]:flex">
      <li className="text-gray-400 font-bold flex gap-1">
        {title.map((item) => (
          <p className={item.className}>{item.name}</p>
        ))}
      </li>
      {children}
    </ul>
  );
}
