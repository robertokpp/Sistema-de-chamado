import { Header } from "../components/Header";
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
import { NewTable } from "../components/NewTable";

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
    <>
      <div className="w-fit mb-4">
        <Header>Meus Chamados</Header>
      </div>

      <section>
        <NewTable
          title={
            session?.user.role != "CLIENT"
              ? [
                  { name: "Atualizado em", className: "flex-1" },
                  { name: "id", className: "flex-[0.5] max-lg:hidden" },
                  { name: "Título e Serviço", className: "flex-2" },
                  {
                    name: "Valor total",
                    className: "flex-[0.5] max-lg:hidden",
                  },
                  { name: "Cliente", className: "flex-2 max-lg:hidden" },
                  { name: "Técnico", className: "flex-2 max-lg:hidden" },
                  { name: "Status", className: "flex-1 max-lg:flex-[0.5]" },
                  { name: "", className: "flex-[0.5]" },
                ]
              : [
                  { name: "Atualizado em", className: "flex-1" },
                  { name: "id", className: "flex-[0.5] max-lg:hidden" },
                  { name: "Título", className: "flex-1" },
                  {
                    name: "Valor total",
                    className: "flex-[0.5] max-lg:hidden",
                  },
                  { name: "Cliente", className: "flex-2 max-lg:hidden" },
                  { name: "Status", className: "flex-1 max-lg:flex-[0.5]" },
                  { name: "", className: "flex-[0.5]" },
                ]
          }
        >
          {calls.map(
            (call) =>
              call.availableForClient === true && (
                <li
                  key={call.id}
                  className="gap-1 border-t border-gray-500 items-center"
                >
                  <p className="text-[12px] flex-1 truncate">
                    {formatDateTime(call.updatedAt)}
                  </p>
                  <p className="text-[12px] flex-[0.5] truncate max-lg:hidden ">
                    {call.id}
                  </p>
                  <div className="flex-2 truncate">
                    <div className="flex flex-col ">
                      <p className="font-bold ">{call.title}</p>
                      <p>{call.service}</p>
                    </div>
                  </div>
                  <p className="font-normal max-lg:hidden flex-[0.5] truncate">
                    {formatsCurrency(call.price)}
                  </p>

                  {session?.user.role != "CLIENT" && (
                    <p className="font-normal max-lg:hidden flex-2 truncate">
                      {call.client}
                    </p>
                  )}
                  <p className="font-normal max-lg:hidden flex-2 truncate">
                    {call.technical}
                  </p>
                  <div className="flex-1 max-lg:flex-[0.5] ">
                    <StatusCall variant={call.status}></StatusCall>
                  </div>
                  <div className="flex-[0.5]">
                    <div className="flex justify-end">
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
                  </div>
                </li>
              ),
          )}
        </NewTable>
      </section>
    </>
  );
}
