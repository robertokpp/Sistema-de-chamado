type Props = {
  ths: string[];
  children: React.ReactNode;
};

export function Table({ ths, children }: Props) {
  return (
    <div className="border rounded-2xl border-[#E3E5E8] mt-4">
      <table className="w-full">
          <thead>
            <tr className="[&_th:first-child]:pl-2 [&_th]:py-4">
              {ths.map((th) => (
                <th key={th} className="text-start">
                  {th}
                </th>
              ))}
            </tr>
          </thead>
        <tbody className="font-bold [&_tr_td]:py-4 [&_tr]:mx-3 [&_tr]:border-t [&_tr]:border-[#E3E5E8]">
          {children}
        </tbody>
      </table>
    </div>
  );
}
