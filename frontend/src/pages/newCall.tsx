import { Header } from "../components/Header";
import { Input } from "../components/Inputs";
import { Textarea } from "../components/Inputs";
import { Select } from "../components/Inputs";
import { Button } from "../components/Button";

import { api } from "../services/api";
import { useEffect, useState } from "react";
import { z, ZodError } from "zod";
import { AxiosError } from "axios";

interface services {
  id: string;
  name: string;
  price: number;
}

const bodySchema = z.object({
  title: z.string().min(3, "Informe um titulo valido.").trim(),
  description: z.string().trim(),
  serviceId: z.uuid("Selecione um serviço."),
});

export function NewCall() {
  const [services, setServices] = useState<services[]>([]);
  const [selectedService, setSelectedService] = useState<services | null>(null);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  async function ListService() {
    const response = await api.get("/services");
    setServices(response.data);
  }

  useEffect(() => {
    ListService();
  }, []);

  async function onSubmit(e: React.SubmitEvent) {
    e.preventDefault();

    try {
      const data = bodySchema.parse({
        title,
        description,
        serviceId: selectedService?.id,
      });

      await api.post("/calls", data);

      alert("Chamado cadastrado com sucesso.");

      setDescription("");
      setTitle("");
      setSelectedService(null);
    } catch (error) {
      if (error instanceof ZodError) {
        return alert(error.issues[0].message);
      }
      if (error instanceof AxiosError) {
        return alert(error.response?.data.message);
      }

      alert("Erro ao cadastrar serviço.");
    }
  }

  return (
    <div>
      <Header>Novo chamado</Header>
      <section className="flex gap-6 mt-6">
        <form
          id="NewCall"
          className="border p-8 rounded-[10px] border-[#E3E5E8]"
          onSubmit={onSubmit}
        >
          <h3 className="font-bold">Informações</h3>
          <span className="text-[12px] text-gray-300">
            Criar um chamado claro e detalhado agiliza a resolução de problemas.
            Utilize as categorias abaixo para estruturar sua solicitação.
          </span>

          <fieldset className="mt-6 flex flex-col gap-4">
            <Input
              required
              legend="Título"
              name="title"
              value={title}
              placeholder="Digite um título para o chamado"
              onChange={(e) => setTitle(e.target.value)}
            ></Input>

            <Textarea
              required
              name="description"
              legend="descrição"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></Textarea>

            <Select
              required
              legend="categoria de serviço"
              value={selectedService?.id ?? ""}
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

        <aside className="flex flex-col border p-8 rounded-[10px] gap-6 h-fit border-[#E3E5E8]">
          <div className="flex flex-col">
            <span className="font-bold">Resumo</span>
            <span className="text-[12px] text-gray-300">Valores e detalhes</span>
          </div>
          <div className="flex flex-col gap-4">
            <dl>
              <dt className="font-bold text-gray-400">Categoria de serviço</dt>
              <dd className="font-[14px] text-gray-200">{selectedService?.name || "Nenhum serviço selecionado"}</dd>
            </dl>
            <dl>
              <dt className="font-bold text-gray-400">Custo inicial</dt>
              <dd className="text-[20px] text-gray-200 ">
                {selectedService
                  ? `R$ ${selectedService.price}`
                  : "Nenhum serviço selecionado"}
              </dd>
            </dl>
          </div>
          <span className="text[12px] text-gray-300">
            O chamado será automaticamente atribuído a um técnico disponível
          </span>

          <Button type="submit" form="NewCall">
            Criar chamado
          </Button>
        </aside>
      </section>
    </div>
  );
}
