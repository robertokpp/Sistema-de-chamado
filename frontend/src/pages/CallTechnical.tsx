import { Cards } from "../components/Cards";
import { Header } from "../components/Header";
import { StatusCall } from "../components/StatusCall";

import { api } from "../services/api";
import { useEffect, useState } from "react";

type CallStatus = "OPEN" | "IN_PROGRESS" | "CLOSE";

interface Call {
  id: string;
  status: CallStatus;
  client: string;
  title: string;
  service: string;
  price: string;
  updatedAt: string;
}

export function CallTechnical() {
  const [calls, setCalls] = useState<Call[]>([]);

  async function HandlerCall() {
    const response = await api.get("/calls");

    console.log(response.data);
    setCalls(response.data);
  }

  useEffect(() => {
    HandlerCall();
  }, []);

  return (
    <div className="w-full">
      <Header>Chamados</Header>
      <section className="flex flex-col gap-4 mt-4">
        <div>
          <StatusCall variant={"OPEN"}></StatusCall>
        </div>
        <div>
          {calls.map(
            (call) =>
              call.status === "OPEN" && (
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
                  ></Cards>
                </div>
              ),
          )}
        </div>

        <div>
          <StatusCall variant={"IN_PROGRESS"}></StatusCall>
        </div>

        <div>
          {calls.map(
            (call) =>
              call.status === "IN_PROGRESS" && (
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
                  ></Cards>
                </div>
              ),
          )}
        </div>

        <div>
          <StatusCall variant={"CLOSE"}></StatusCall>
        </div>
        <div>
          {calls.map(
            (call) =>
              call.status === "CLOSE" && (
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
                  ></Cards>
                </div>
              ),
          )}
        </div>
      </section>
    </div>
  );
}
