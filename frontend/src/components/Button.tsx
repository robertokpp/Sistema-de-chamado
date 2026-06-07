type Props = React.ComponentProps<"button">;

export function Button({ children, ...Rest }: Props) {
 return <button className="w-full bg-amber-950 py-2 text-white rounded-lg cursor-pointer"{...Rest}>{children}</button>;
}
