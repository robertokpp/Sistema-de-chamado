import { Header } from "../components/Header";

export function Client() {

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
      </section>
    </div>
  );
}
