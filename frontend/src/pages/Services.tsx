import { Header } from "../components/Header";
import { Button } from "../components/Button";
import { Modal } from "../components/Modal";
import { Input } from "../components/Inputs";
import { Status } from "../components/Status";
import { NewTable } from "../components/NewTable";

import iconPlus from "../assets/icon-plus.svg";
import iconBan from "../assets/icon-ban.svg";
import iconCheck from "../assets/icon-circle-check.svg";
import iconPen from "../assets/icon-pen-line.svg";

import { api } from "../services/api";
import { formatsCurrency, formatsCurrencyInput } from "../utils/formatters";
import { useState, useEffect } from "react";
import { AxiosError } from "axios";
import { z, ZodError } from "zod";

const bodySchema = z.object({
  name: z.string().trim().min(3, "Informe um nome válido."),
  price: z.coerce.number().positive("O valor deve ser maior que zero."),
});

interface Services {
  id: string;
  name: string;
  price: string;
  active: boolean;
}

export function Services() {
  const [price, setPrice] = useState("");
  const [name, setName] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [newService, setNewService] = useState(true);
  const [id, setId] = useState("");
  const [services, setServices] = useState<Services[]>([]);

  function handleValueChange(e: React.ChangeEvent<HTMLInputElement>) {
    const inputValue = e.target.value;

    const formattedValue = formatsCurrencyInput(inputValue);

    setPrice(formattedValue);
  }

  async function onSubmit(event: React.SubmitEvent) {
    event.preventDefault();

    if (newService) {
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
    } else {
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

        await api.patch(`/services/${id}`, data);

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
  }

  async function listService() {
    const response = await api.get("/services");
    setServices(response.data);
  }

  async function activeService(id: string, active: boolean) {
    const data = {
      id,
      active,
    };

    await api.patch("/services", data);

    await listService();
  }

  useEffect(() => {
    listService();
  }, []);

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-5">
        <Header>Serviços</Header>
        <Button
          svg={iconPlus}
          onClick={() => {
            setIsOpen(true);
            setNewService(true);
            setName("");
            setPrice("");
          }}
        >
          Novo
        </Button>
      </div>

      <section>
        <NewTable
          title={[
            { name: "Título", className: "flex-2" },
            { name: "Valor", className: "flex-1" },
            { name: "Status", className: "flex-1" },
            { name: "", className: "flex-1" },
          ]}
        >
          {services.map((service) => (
            <li className="border-t border-gray-500 items-center">
              <p className="truncate flex-2 font-bold">{service.name}</p>
              <p className="truncate flex-1">
                {formatsCurrency(service.price)}
              </p>

              <div className="flex-1">
                <div className="max-lg:flex max-lg:justify-center">
                  {
                    <Status active={service.active}>
                      {service.active ? "Ativo" : "Inativo"}
                    </Status>
                  }
                </div>
              </div>

              <div className="flex-1">
                <div className="flex justify-between">
                  <button
                    className="cursor-pointer max-lg:hidden"
                    onClick={() => activeService(service.id, !service.active)}
                  >
                    {service.active ? (
                      <span className="flex gap-0.5">
                        <img src={iconBan} /> Desativar
                      </span>
                    ) : (
                      <span className="flex gap-0.5">
                        <img src={iconCheck} /> Reativar
                      </span>
                    )}
                  </button>

                  <Button
                    onClick={() => activeService(service.id, !service.active)}
                    className="lg:hidden bg-transparent"
                  >
                    {service.active ? (
                      <img className="w-5" src={iconBan} />
                    ) : (
                      <img className="w-5" src={iconCheck} />
                    )}
                  </Button>

                  <Button
                    svg={iconPen}
                    className="bg-gray-500"
                    onClick={() => {
                      setIsOpen(true);
                      setNewService(false);
                      setName(service.name);
                      setPrice(formatsCurrency(service.price));
                      setId(service.id);
                    }}
                  ></Button>
                </div>
              </div>
            </li>
          ))}
        </NewTable>
      </section>

      <Modal tittle="Serviço" isOpen={isOpen} onClose={() => setIsOpen(false)}>
        {
          <form className="flex flex-col gap-4" onSubmit={onSubmit}>
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
