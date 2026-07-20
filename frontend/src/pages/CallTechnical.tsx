import { Cards } from "../components/Cards";
import { Header } from "../components/Header";
import { StatusCall } from "../components/StatusCall";

import { api } from "../services/api";
import { useEffect, useState } from "react";
import { AxiosError } from "axios";

type CallStatus = "OPEN" | "IN_PROGRESS" | "CLOSE";

interface Call {
  id: string;
  status: CallStatus;
  client: string;
  title: string;
  service: string;
  price: string;
  updatedAt: string;
  availableForClient: boolean;
}

export function CallTechnical() {
  const [calls, setCalls] = useState<Call[]>([]);

  async function handlerCall() {
    const response = await api.get("/calls");
    console.log(response.data)
    setCalls(response.data);
  }

  async function updateStatus(id: string, newStatus: string) {
    try {
      const data = {
        status: newStatus,
      };

      await api.patch(`/calls/${id}`, data);

      setCalls((calls) =>
        calls.map((call) =>
          call.id === id ? { ...call, status: newStatus as CallStatus } : call,
        ),
      );

      
    } catch (error) {
      if (error instanceof AxiosError) {
        return alert(error.response?.data.message);
      }

      alert("Nao foi possível atualizar o Status");
    }
  }

  useEffect(() => {
    handlerCall();
  }, []);

  return (
    <div className="w-full">
      <Header>Chamados</Header>
      <section className="flex flex-col gap-4 mt-4">
        <div>
          <StatusCall variant={"OPEN"}></StatusCall>
        </div>
        <div className="flex gap-4 flex-wrap">
          {calls.map(
            (call) =>
              call.status === "OPEN" && call.availableForClient === true && (
                <div>
                  <Cards
                    updatedAt={call.updatedAt}
                    price={call.price}
                    service={call.service}
                    title={call.title}
                    key={call.id}
                    id={call.id}
                    status={call.status}
                    client={call.client}
                    onUpdate={updateStatus}
                  ></Cards>
                </div>
              ),
          )}
        </div>

        <div>
          <StatusCall variant={"IN_PROGRESS"}></StatusCall>
        </div>

        <div className="flex gap-4 flex-wrap">
          {calls.map(
            (call) =>
              call.status === "IN_PROGRESS" && call.availableForClient === true && (
                <div>
                  <Cards
                    updatedAt={call.updatedAt}
                    price={call.price}
                    service={call.service}
                    title={call.title}
                    key={call.id}
                    id={call.id}
                    status={call.status}
                    client={call.client}
                    onUpdate={updateStatus}
                  ></Cards>
                </div>
              ),
          )}
        </div>

        <div>
          <StatusCall variant={"CLOSE"}></StatusCall>
        </div>

        <div className="flex gap-4 flex-wrap">
          {calls.map(
            (call) =>
              call.status === "CLOSE" && call.availableForClient === true && (
                <div>
                  <Cards
                    updatedAt={call.updatedAt}
                    price={call.price}
                    service={call.service}
                    title={call.title}
                    key={call.id}
                    id={call.id}
                    status={call.status}
                    client={call.client}
                    onUpdate={updateStatus}
                  ></Cards>
                </div>
              ),
          )}
        </div>
      </section>
    </div>
  );
}
