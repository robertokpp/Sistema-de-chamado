import { Header } from "../components/Header";
import { Button } from "../components/Button";
import { Modal } from "../components/Modal";
import { Input } from "../components/Inputs";
import iconPlus from "../assets/icon-plus.svg";

import { api } from "../services/api";
import { formatsCurrency } from "../utils/formatters";
import { useState, useEffect } from "react";
import { AxiosError } from "axios";
import { z, ZodError } from "zod";

const bodySchema = z.object({
  name: z.string().trim().min(3, "Informe um nome válido."),
  price: z.number().positive("O valor deve ser maior que zero."),
});

interface services {
  id: string;
  name: string;
  price: string;
  active: boolean;
}

export function Services() {
  const [price, setPrice] = useState("");
  const [name, setName] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [services, setServices] = useState<services[]>([]);

  function handleValueChange(e: React.ChangeEvent<HTMLInputElement>) {
    const inputValue = e.target.value;

    const formattedValue = formatsCurrency(inputValue);

    setPrice(formattedValue);
  }

  async function onSubmit(event: React.SubmitEvent) {
    event.preventDefault();

    try {
      const numericPrice = Number(
        price
          .replace(/[^\d,]/g, "")
          .replace(".", "")
          .replace(",", "."),
      );

      const data = bodySchema.parse({
        name,
        price: numericPrice,
      });

      await api.post("/services", data);

      setName("");
      setPrice("");
      listService();
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

  async function listService() {
    const response = await api.get("/services");
    setServices(response.data);
  }

  useEffect(() => {
    listService();
  }, []);

  return (
    <div className="w-full">
      <div className="flex justify-between items-center">
        <Header>Serviços</Header>
        <Button svg={iconPlus} onClick={() => setIsOpen(true)}>
          Novo
        </Button>
      </div>

      <section className="mt-6 border border-[#E3E5E8] rounded-[10px]">
        <ul className="flex py-3.5 px-3 text-[#858B99] font-bold">
          <li className="w-[48%]">Título</li>
          <li className="w-[30%]">Valor</li>
          <li className="w-[13%]">Status</li>
          <li className="w-[9%]">Active</li>
        </ul>
        {services.map((service) => (
          <ul className="flex py-5 px-3 border-t border-[#E3E5E8]" key={service.id}>
            <li className="w-[48%] font-bold">{service.name}</li>
            <li className="w-[30%]">{`R$ ${service.price}`}</li>
            <li className="w-[13%]">{`${service.active}`}</li>
          </ul>
        ))}
      </section>

      <Modal tittle="Serviço" isOpen={isOpen} onClose={() => setIsOpen(false)}>
        {
          <form className="py-8 flex flex-col gap-4" onSubmit={onSubmit}>
            <Input
              legend="Título"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              legend="Valor"
              placeholder="R$ 0,00"
              value={price}
              onChange={handleValueChange}
            />
            <Button className="w-full font-normal" type="submit">
              Salvar
            </Button>
          </form>
        }
      </Modal>
    </div>
  );
}
