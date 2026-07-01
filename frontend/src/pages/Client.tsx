import { Header } from "../components/Header";
import { api } from "../services/api";
import { useState, useEffect } from "react";

interface client {
  id: string;
  name: string;
  email: string;
}

export function Client() {
  const [clients, useClients] = useState<client[]>([]);

  async function ListClient() {
    const response = await api.get("/client");
    console.log(response.data);
    return useClients(response.data);
  }

  useEffect(() => {
    ListClient();
  }, []);

  return (
    <div className="w-full">
      <div className="flex justify-between items-center">
        <Header>Clientes</Header>
      </div>

      <section className="mt-6 border border-[#E3E5E8] rounded-[10px]">
        <ul className="flex py-3.5 px-3 text-[#858B99] font-bold">
          <li className="w-[48%]">Nome</li>
          <li className="w-[30%]">E-mail</li>
          <li className="w-[9%]"></li>
        </ul>

        {clients.map((client) => (
          <ul
            key={client.id}
            className="flex py-3.5 px-3 border-t border-[#E3E5E8]"
          >
            <li className="w-[48%]">{client.name}</li>
            <li className="w-[30%]">{client.email}</li>
            <li className="w-[9%]"></li>
          </ul>
        ))}
      </section>
    </div>
  );
}
