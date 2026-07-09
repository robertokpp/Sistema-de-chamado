import { Header } from "../components/Header";
import { Input } from "../components/Inputs";
import { Textarea } from "../components/Inputs";

import { useParams } from "react-router";
import { api } from "../services/api";
import { useEffect, useState } from "react";
import { formatDateTime } from "../utils/formatterData";
import { formatsCurrency } from "../utils/formatters";

interface CallResponse {
  callServices: {
    title: string;
    description: string;
    status: string;
    category: {
      name: string;
      price: string;
    }[];
    createdAt: string;
    updateAt: string;
    technicalName: string;
    technicalEmail: string;
    totalService: number;
  };
}

export function CallDetails() {
  const { id } = useParams();
  const [call, setCall] = useState<CallResponse>();

  async function HandlerCallDetails() {
    const response = await api.get(`/calls/${id}`);
    console.log(response.data);
    return setCall(response.data);
  }

  useEffect(() => {
    HandlerCallDetails();
  }, []);

  return (
    <div className="w-fit">
      <span>Voltar</span>
      <Header>Chamado detalhado</Header>
      <section className="flex gap-2">
        <div className="border p-8 rounded-[10px]">
          <div className="flex flex-col mb-6">
            <div className="flex justify-between pt-1.5 items-center">
              <span className="text-[12px] font-bold text-gray-300">{id}</span>
              <span>{call?.callServices.status}</span>
            </div>
            <span className="font-bold">{call?.callServices.title}</span>
          </div>

          <Textarea
            disabled
            legend="Descrição"
            defaultValue={call?.callServices.description}
          ></Textarea>

          <Input
            disabled
            legend="Categoria"
            value={call?.callServices.category[0].name}
          />
          <div className="flex gap-8">
            <Input
              legend="Criado em"
              disabled
              value={call ? formatDateTime(call.callServices.createdAt) : ""}
            />
            <Input
              disabled
              legend="Atualizado em"
              value={call ? formatDateTime(call.callServices.updateAt) : ""}
            />
          </div>
        </div>
        <section className="flex flex-col border p-8 rounded-[10px] gap-6 h-fit">
          <div className="flex flex-col">
            <span>Técnico responsável</span>
            <div>
              <div className="w-8 h-8 bg-blue-base rounded-full flex justify-center items-center">
                <span className="text-[14px]">cs</span>
              </div>
              <div className="flex flex-col">
                <span>{call?.callServices.technicalName}</span>
                <span>{call?.callServices.technicalEmail}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div className="w-full">
              <dt>Valores</dt>
              <div className="flex w-full justify-between">
                <span>Preço Base</span>
                <span>
                  {formatsCurrency(call?.callServices.category[0].price)}
                </span>
              </div>
            </div>

            <div>
              <span>Adicionais</span>
              {call?.callServices.category.map((item) => (
                <div key={item.name} className="flex justify-between">
                  <span>{item.name}</span>
                  <span>{formatsCurrency(item.price)}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-between font-bold">
            <span>Total</span>
            <span>{formatsCurrency(call?.callServices.totalService)}</span>
          </div>
        </section>
      </section>
    </div>
  );
}
