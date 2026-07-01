import { Header } from "../components/Header";
import { Button } from "../components/Button";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { api } from "../services/api";

interface technical {
  id: string;
  name: string;
  email: string;
  hours: [];
}

export function Technical() {
  const navigate = useNavigate();
  const [technicals, useTechnicals] = useState<technical[]>([]);

  async function ListTechnical() {
    const response = await api.get("/technical");
    console.log(response.data);

    useTechnicals(response.data);
  }

  useEffect(() => {
    ListTechnical();
  }, []);

  return (
    <div className="w-full">
      <div className="flex justify-between items-center">
        <Header>Técnicos</Header>
        <Button onClick={() => navigate("/novo-tecnico")}>Novo</Button>
      </div>

      <section className="mt-6 border border-[#E3E5E8] rounded-[10px]">
        <ul className="flex py-3.5 px-3 text-[#858B99] font-bold">
          <li className="w-[48%]">Nome</li>
          <li className="w-[30%]">E-mail</li>
          <li className="w-[13%]">Disponibilidade</li>
          <li className="w-[9%]"></li>
        </ul>
      </section>

      {technicals.map((technical) => (
        <ul className="flex py-3.5 px-3 text-[#858B99] font-bold">
          <li className="w-[48%]">{technical.name}</li>
          <li className="w-[30%]">{technical.email}</li>
          <ul className="flex gap-0.5">
            {technical.hours.map((hour) => (
              <li className="border">{hour}</li>
            ))}
          </ul>
          <li className="w-[9%]"></li>
        </ul>
      ))}
    </div>
  );
}
