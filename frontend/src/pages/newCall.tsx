import { Header } from "../components/Header";
import { Input } from "../components/Inputs";
import { Textarea } from "../components/Inputs";
import { Select } from "../components/Inputs";
export function NewCall() {
  return (
    <main className="bg-white rounded-tl-[20px] mt-3 w-full p-12 flex flex-col">
      <Header>Novo chamado</Header>
      <section className="flex gap-6">
        <form action="" className="border p-8 rounded-[10px]">
          <fieldset>
            <h3>Informações</h3>
            <span>
              Configure os dias e horários em que você está disponível para
              atender chamados
            </span>

            <Input
              legend="Título"
              placeholder="Digite um título para o chamado"
            ></Input>

            <Textarea legend="descrição"></Textarea>
            <Input legend="Título"></Input>

            <Select legend="categoria de serviço">
              <option value="">teste 01</option>
              <option value="">teste 02</option>
              <option value="">teste 03</option>
            </Select>
          </fieldset>
        </form>
        <aside className="flex flex-col border p-8 rounded-[10px] gap-6">
          <div className="flex flex-col">
            <span>Resumo</span>
            <span>Valores e detalhes</span>
          </div>
          <div className="flex flex-col gap-4">
            <dl>
              <dt>Categoria de serviço</dt>
              <dd>Erro de rede</dd>
            </dl>
            <dl>
              <dt>Custo inicial</dt>
              <dd>R$ 200,00</dd>
            </dl>
          </div>
          <span>
            O chamado será automaticamente atribuído a um técnico disponível
          </span>

          <button>Criar chamado</button>
        </aside>
      </section>
    </main>
  );
}
