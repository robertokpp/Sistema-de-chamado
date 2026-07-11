import { Header } from "../components/Header";
import { Table } from "../components/Table";
import { Button } from "../components/Button";
import { StatusCall } from "../components/StatusCall";

import { formatDateTime } from "../utils/formatterData";
import { formatsCurrency } from "../utils/formatters";
import iconPen from "../assets/icon-pen-line.svg";

import { useEffect, useState } from "react";
import { api } from "../services/api";
import { useNavigate } from "react-router";

type CallStatus = "OPEN" | "IN_PROGRESS" | "CLOSE";

interface call {
  updatedAt: string;
  id: string;
  title: string;
  service: string;
  client: string;
  price: string;
  technical: string;
  status: CallStatus;
}

export function Calls() {
  const [calls, useCalls] = useState<call[]>([]);
  const navigate = useNavigate();

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
              <td className="p-1">
                <StatusCall variant={call.status}></StatusCall>
              </td>
              <td>
                <Button
                  className="bg-gray-500 w-fit"
                  onClick={() => navigate(`/chamado/${call.id}`)}
                  svg={iconPen}
                />
              </td>
            </tr>
          ))}
        </Table>
      </section>
    </div>
  );
}
