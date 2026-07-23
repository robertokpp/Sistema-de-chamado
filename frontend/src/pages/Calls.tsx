import { Header } from "../components/Header";
import { Table } from "../components/Table";
import { Button } from "../components/Button";
import { StatusCall } from "../components/StatusCall";

import { formatDateTime } from "../utils/formatterData";
import { formatsCurrency } from "../utils/formatters";
import { useAuth } from "../hooks/useAuth";

import iconPen from "../assets/icon-pen-line.svg";
import iconEye from "../assets/icon-eye.svg";

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
  availableForClient: boolean;
}

export function Calls() {
  const [calls, useCalls] = useState<call[]>([]);
  const navigate = useNavigate();
  const { session } = useAuth();

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
          ths={
            session?.user.role != "CLIENT"
              ? [
                  { title: "Atualizado em" },
                  { title: "id", visible: "hidden" },
                  { title: "Título e Serviço" },
                  { title: "Valor total", visible: "hidden" },
                  { title: "Cliente", visible: "hidden" },
                  { title: "Técnico", visible: "hidden" },
                  { title: "Status" },
                ]
              : [
                  { title: "Atualizado em" },
                  { title: "id", visible: "hidden" },
                  { title: "Título" },
                  { title: "Valor total", visible: "hidden" },
                  { title: "Cliente", visible: "hidden" },
                  { title: "Status" },
                ]
          }
        >
          {calls.map(
            (call) =>
              call.availableForClient === true && (
                <tr key={call.id}>
                  <td className="pl-2 font-normal text-[12px]">
                    {formatDateTime(call.updatedAt)}
                  </td>
                  <td className="text-[12px] max-lg:hidden">{call.id}</td>
                  <td className="flex flex-col">
                    <span>{call.title}</span>
                    <span className="font-normal">{call.service}</span>
                  </td>
                  <td className="font-normal max-lg:hidden">
                    {formatsCurrency(call.price)}
                  </td>

                  {session?.user.role != "CLIENT" && (
                    <td className="font-normal max-lg:hidden">{call.client}</td>
                  )}
                  <td className="font-normal max-lg:hidden">
                    {call.technical}
                  </td>
                  <td>
                    <div className="flex gap-1 p-1">
                      <StatusCall variant={call.status}></StatusCall>
                      <Button
                        className="bg-gray-500"
                        onClick={() => navigate(`/chamado/${call.id}`)}
                      >
                        <img
                          src={
                            session?.user.role === "CLIENT" ? iconEye : iconPen
                          }
                        />
                      </Button>
                    </div>
                  </td>
                </tr>
              ),
          )}
        </Table>
      </section>
    </div>
  );
}
