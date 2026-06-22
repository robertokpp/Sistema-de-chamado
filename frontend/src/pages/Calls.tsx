import { Header } from "../components/Header";

export function Calls() {
  return (
    <div className="w-full">
      <Header>Meus Chamados</Header>
      <section>
        <div className="flex gap-3 w-full justify-between [&>ul>*]:py-4 [&>ul>span]:text-[14px] [&>ul>span]:text-gray-400 px-3 ">
          <ul>
            <span>Atualizado em</span>
            <li>13/04/25 20:56</li>
          </ul>
          <ul>
            <span>Id</span>
            <li>00003</li>
          </ul>
          <ul>
            <span>Título</span>
            <li>Rede lenta</li>
          </ul>
          <ul>
            <span>Serviço</span>
            <li>Instalação de Rede</li>
          </ul>
          <ul>
            <span>Valor total</span>
            <li>R$ 180,00</li>
          </ul>
          <ul>
            <span>Técnico</span>
            <li>Carlos Silva</li>
          </ul>
          <ul>
            <span>Status</span>
            <li className="flex">Aberto</li>
          </ul>
          <ul>
            <span>teste</span>
            <li>
              <button>teste</button>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}
