import { SideMenu } from "../components/Menu";

export function Client() {
  return (
    <div className="bg-gray-200 w-max-[1440px]">
      <div className="flex">
        <SideMenu />
        <div className="bg-white rounded-tl-[20px] mt-3 w-full p-12">
          <h1 className="text-blue-dark text-2xl font-bold w-full mb-6">
            Meus Chamados
          </h1>
          <div className="flex gap-3 w-full justify-between [&>ul>span]:text-[14px] [&>ul>span]:text-gray-400 px-3">
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
              <li>teste</li>
            </ul>
            <ul>
              <span>Valor total</span>
              <li>teste</li>
            </ul>
            <ul>
              <span>Técnico</span>
              <li>teste</li>
            </ul>
            <ul>
              <span>Status</span>
              <li>teste</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
