import { Header } from "../components/Header";
import { Input } from "../components/Inputs";
import { Textarea } from "../components/Inputs";
import { Select } from "../components/Inputs";
import { Button } from "../components/Button";

import { api } from "../services/api";
import { useEffect, useState } from "react";

interface services {
  id: string;
  name: string;
  price: number;
}

export function NewCall() {
  const [services, setServices] = useState<services[]>([]);
  const [selectedService, setSelectedService] = useState<services | null>(null);

  async function ListService() {
    const response = await api.get("/services");
    setServices(response.data);
  }

  useEffect(() => {
    ListService();
  }, []);

  return (
    <div>
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

            <Select
              legend="categoria de serviço"
              onChange={(e) => {
                const service = services.find(
                  (item) => item.id === e.target.value,
                );
                setSelectedService(service || null);
              }}
            >
              <option value="">Selecione um serviço</option>
              {services.map((service) => (
                <option value={service.id} key={service.id}>
                  {service.name}
                </option>
              ))}
            </Select>
          </fieldset>
        </form>

        <aside className="flex flex-col border p-8 rounded-[10px] gap-6 h-fit">
          <div className="flex flex-col">
            <span>Resumo</span>
            <span>Valores e detalhes</span>
          </div>
          <div className="flex flex-col gap-4">
            <dl>
              <dt>Categoria de serviço</dt>
              <dd>{selectedService?.name || "Nenhum serviço selecionado"}</dd>
            </dl>
            <dl>
              <dt>Custo inicial</dt>
              <dd>
                {selectedService
                  ? `R$ ${selectedService.price}`
                  : "Nenhum serviço selecionado"}
              </dd>
            </dl>
          </div>
          <span>
            O chamado será automaticamente atribuído a um técnico disponível
          </span>

          <Button type="submit">Criar chamado</Button>
        </aside>
      </section>
    </div>
  );
}
