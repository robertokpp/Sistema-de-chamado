import close from "../assets/icon-close-white.svg";
import { useState } from "react";

type Props = React.ComponentProps<"input"> & {
  children: string;
};

export function Checkbox({ children }: Props) {
  const [checked, setChecked] = useState(false);

  return (
    <>
      <legend className="border border-gray-400 font-bold rounded-2xl w-17.25 h-fit relative has-checked:text-white has-checked:bg-blue-base has-checked:border-blue-base cursor-pointer flex justify-center items-center p-1">
        <input
          checked={checked}
          onChange={(e) => setChecked(e.target.checked)}
          type="checkbox"
          className="absolute w-full h-full appearance-none "
        />
        {children}
        {checked && <img src={close} alt="" className="fill-amber-50"/>}
      </legend>
    </>
  );
}
