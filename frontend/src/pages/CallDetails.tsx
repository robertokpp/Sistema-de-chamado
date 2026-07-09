import { Header } from "../components/Header";
import { Input } from "../components/Inputs";
import { Textarea } from "../components/Inputs";

import { useParams } from "react-router";
import { api } from "../services/api";

export function CallDetails() {
  const { id } = useParams();

  async function HandlerCallDetails() {
    const response = await api.get(`/call/${id}`);

    console.log(response);
  }

  return (
    <div className="w-fit">
      <span>Voltar</span>
      <Header>Chamado detalhado</Header>
      <section className="flex gap-6">
        <div className="border p-8 rounded-[10px]">
          <div>
            <div className="flex justify-between">
              <span>{id}</span>
              <span>detalhe-do-chamado</span>
            </div>
            <span>Backup não está funcionando</span>
          </div>

          <Textarea legend="Descrição">
            O sistema de backup automático parou de funcionar. Última execução
            bem-sucedida foi há uma semana.
          </Textarea>

          <Input legend="Categoria" value="Recuperação de Dados" />
          <div className="flex gap-8">
            <Input legend="Categoria" value="12/04/25 09:12" />
            <Input legend="Categoria" value="12/04/25 09:12" />
          </div>
        </div>
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
    </div>
  );
}
