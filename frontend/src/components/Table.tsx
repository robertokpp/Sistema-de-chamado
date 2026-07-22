import React from "react";

type Th = {
  title: string;
  visible?: "hidden" | "block";
};

type Props = {
  ths: Th[];
  children: React.ReactNode;
};

export function Table({ ths, children }: Props) {
  return (
    <div className="border rounded-2xl border-[#E3E5E8] mt-4">
      <table className="w-full">
        <thead>
          <tr className="[&_th:first-child]:pl-2 [&_th]:py-4 text-gray-400">
            {ths.map((th) => (
              <th key={th.title} className={`text-start max-lg:${th.visible ?? "block"}`}>
                {th.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="font-bold [&_tr_td]:py-4 [&_tr]:border-t [&_tr]:border-[#E3E5E8]">
          {children}
        </tbody>
      </table>
    </div>
  );
}
