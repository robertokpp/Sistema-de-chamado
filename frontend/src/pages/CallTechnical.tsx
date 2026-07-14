import { Cards } from "../components/Cards";
import { Header } from "../components/Header";

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
    <div>
      <Header>Chamados</Header>
      <section className="flex gap-4">
        {calls.map((call) => (
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
        ))}
      </section>
    </div>
  );
}
