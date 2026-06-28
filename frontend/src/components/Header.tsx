import type { PropsWithChildren } from "react";

export function Header({ children }: PropsWithChildren) {
  return (
    <header>
      <h1 className="text-blue-dark text-2xl font-bold w-full">
        {children}
      </h1>
    </header>
  );
}
