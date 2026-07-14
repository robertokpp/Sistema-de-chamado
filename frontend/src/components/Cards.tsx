import { Button } from "./Button";

import iconPen from "../assets/icon-pen-line.svg";
import iconCheckBig from "../assets/icon-checkBig.svg"
import iconClock from "../assets/icon-Clock2.svg"

let status = "in_progress";
export function Cards() {
  return (
    <div className="border p-5 border-gray-500 rounded-[10px] min-w-86.5">
      <div className="flex justify-between">
        <span className="text-gray-400 font-bold text-[12px]">id</span>
        <div className="flex gap-2">
          <Button className="bg-gray-500" svg={iconPen}></Button>
          {status === "open" && <Button svg={iconCheckBig}>Iniciar</Button>}
          {status === "in_progress" && <Button svg={iconClock}>Encerra</Button>}
        </div>
      </div>

      <div className="mb-4">
        <p className="font-bold">Rede lenta</p>
        <small>Instalação de Rede</small>
      </div>

      <div className="flex justify-between pb-4 border-b border-gray-500">
        <p>10/04/25 15:13</p>
        <p>R$ 200,00</p>
      </div>

      <div className="pt-4">
        <div className="flex gap-2">
          <div className="rounded-full bg-blue-base p-0.5">
            <span>AC</span>
          </div>
          <p className="font-bold">Andre Costa</p>
        </div>
        <img src="" />
      </div>
    </div>
  );
}
