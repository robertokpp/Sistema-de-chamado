import { Button } from "./Button";

import iconPen from "../assets/icon-pen-line.svg";
import iconCheckBig from "../assets/icon-checkBig.svg";
import iconClock from "../assets/icon-Clock2.svg";

import { formatDateTime } from "../utils/formatterData";
import { formatsCurrency } from "../utils/formatters";
//import { api } from "../services/api";
import { useNavigate } from "react-router";

type Props = {
  id: string;
  status: string;
  client: string;
  title: string;
  service: string;
  price: string;
  updatedAt: string;
};

export function Cards({
  id,
  status,
  client,
  title,
  service,
  price,
  updatedAt,
}: Props) {
  const navigate = useNavigate();

  return (
    <div className="border p-5 border-gray-500 rounded-[10px] min-w-86.5 max-w-100">
      <div className="flex justify-between">
        <span className="text-gray-400 font-bold text-[12px]">{id}</span>
        <div className="flex gap-2">
          <Button
            className="bg-gray-500"
            onClick={() => navigate(`/chamados/${id}`)}
            svg={iconPen}
          ></Button>
          {status === "OPEN" && <Button svg={iconCheckBig}>Iniciar</Button>}
          {status === "IN_PROGRESS" && <Button svg={iconClock}>Encerra</Button>}
        </div>
      </div>

      <div className="mb-4">
        <p className="font-bold">{title}</p>
        <small>{service}</small>
      </div>

      <div className="flex justify-between pb-4 border-b border-gray-500">
        <p>{formatDateTime(updatedAt)}</p>
        <p>{formatsCurrency(price)}</p>
      </div>

      <div className="pt-4">
        <div className="flex gap-2">
          <div className="rounded-full bg-blue-base p-0.5">
            <span>AC</span>
          </div>
          <p className="font-bold">{client}</p>
        </div>
        <img src="" />
      </div>
    </div>
  );
}
