import { Input } from "../components/Inputs";
import { Button } from "../components/Button";
import closer from "../assets/icon-closer.svg";
export function Modal() {
  return (
    <div className="fixed inset-0 bg-black/25 flex justify-center items-center ">
      <div className="w-110 h-fit bg-white p-7 rounded-2xl">
        <header className="flex justify-between pb-5">
          <h2>Serviço</h2>
          <img src={closer} alt="IconClose" />
        </header>
        <div className="py-8 flex flex-col gap-4">
          <Input legend="Título" />
          <Input legend="Valor" />
        </div>

        <Button className="w-full font-normal">Salvar</Button>
      </div>
    </div>
  );
}
