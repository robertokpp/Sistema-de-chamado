import { Header } from "../components/Header";
import { Table } from "../components/Table";
import { Button } from "../components/Button";

import { formatDateTime } from "../utils/formatterData";
import { formatsCurrency } from "../utils/formatters";
import iconPen from "../assets/icon-pen-line.svg";

import { useEffect, useState } from "react";
import { api } from "../services/api";

interface call {
  updatedAt: string;
  id: string;
  title: string;
  service: string;
  client: string;
  price: string;
  technical: string;
  status: string;
}

export function Calls() {
  const [calls, useCalls] = useState<call[]>([]);

  async function listCalls() {
    const response = await api.get("/calls");
    useCalls(response.data);
  }

  useEffect(() => {
    listCalls();
  }, []);

  return (
    <div className="w-full">
      <Header>Meus Chamados</Header>

      <section>
        <Table
          ths={[
            "Atualizado em",
            "id",
            "Título e Serviço",
            "Valor total",
            "Cliente",
            "Técnico",
            "Status",
          ]}
        >
          {calls.map((call) => (
            <tr key={call.id}>
              <td className="pl-2 font-normal text-[12px]">
                {formatDateTime(call.updatedAt)}
              </td>
              <td className="text-[12px]">{call.id}</td>
              <td className="flex flex-col">
                <span>{call.title}</span>
                <span className="font-normal">{call.service}</span>
              </td>
              <td className="font-normal">{formatsCurrency(call.price)}</td>
              <td className="font-normal">{call.client}</td>
              <td className="font-normal">{call.technical}</td>
              <td className="">{call.status}</td>
              <td>
                <Button className="bg-gray-500" svg={iconPen}/>
              </td>
            </tr>
          ))}
        </Table>
      </section>
    </div>
  );
}
