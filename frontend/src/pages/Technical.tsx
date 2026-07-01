import { Header } from "../components/Header";
import { Button } from "../components/Button";

import { useNavigate } from "react-router";

export function Technical() {
  const navigate = useNavigate();

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
    </div>
  );
}
