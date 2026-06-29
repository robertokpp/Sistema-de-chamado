import { Header } from "../components/Header";

import { useEffect, useState } from "react";
import { api } from "../services/api";

interface call {
  id: string;
  createdAt: string;
  title: string;
  description: string;
  technicalId: string;
}

export function Calls() {
  const [calls, useCalls] = useState<call[]>([]);

  async function listCalls() {
    const response = await api.get("/calls");
    console.log(response.data);
    useCalls(response.data);
  }

  useEffect(() => {
    listCalls();
  }, []);

  return (
    <div className="w-full">
      <Header>Meus Chamados</Header>
      <section className="mt-6 border border-[#E3E5E8] rounded-[10px]">
        <ul className="flex w-full font-bold text-[#858B99] py-3.5 px-3">
          <li className="w-[11%]">Atualizado em</li>
          <li className="w-[6%]">Id</li>
          <li className="w-[21%]">Título</li>
          <li className="w-[19%]">Serviço</li>
          <li className="w-[10%]">Valor total</li>
          <li className="w-[14.5%]">Técnico</li>
          <li className="w-[14.5%]">Status</li>
          <li className="w-[5%]">editar</li>
        </ul>

        {calls.map((call) => (
          <ul
            key={call.id}
            className="flex w-full font-bold text-[#858B99] py-3.5 px-3"
          >
            <li className="w-[11%]">{call.createdAt}</li>
            <li className="w-[6%]">{call.id}</li>
            <li className="w-[21%]">{call.title}</li>
            <li className="w-[19%]">{call.title}</li>
            <li className="w-[10%]">Valor total</li>
            <li className="w-[14.5%]">Técnico</li>
            <li className="w-[14.5%]">Status</li>
            <li className="w-[5%]">editar</li>
          </ul>
        ))}
      </section>
    </div>
  );
}
