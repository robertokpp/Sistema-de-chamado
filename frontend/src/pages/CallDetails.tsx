import { Header } from "../components/Header";
import { Input } from "../components/Inputs";
import { Textarea } from "../components/Inputs";
import { StatusCall } from "../components/StatusCall";

import iconArrow from "../assets/icon-arrowLeft.svg";
import iconProgress from "../assets/icon-progress.svg";
import iconDone from "../assets/icon-close2.svg";
import iconPlus from "../assets/icon-plus.svg"

import { useParams } from "react-router";
import { api } from "../services/api";
import { useEffect, useState } from "react";
import { formatDateTime } from "../utils/formatterData";
import { formatsCurrency } from "../utils/formatters";
import { Button } from "../components/Button";
import { useNavigate } from "react-router";
import { AxiosError } from "axios";
import { useAuth } from "../hooks/useAuth";

type CallStatus = "OPEN" | "IN_PROGRESS" | "CLOSE";

interface CallResponse {
  callServices: {
    title: string;
    description: string;
    client: string;
    status: CallStatus;
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
  const navigate = useNavigate();
  const { session } = useAuth();

  async function HandlerCallDetails() {
    const response = await api.get(`/calls/${id}`);
    return setCall(response.data);
  }

  async function handlerUpdateStatus(newStatus: string) {
    try {
      const data = {
        status: newStatus,
      };
      await api.patch(`/calls/${id}`, data);

      HandlerCallDetails();
    } catch (error) {
      if (error instanceof AxiosError) {
        return alert(error.response?.data.message);
      }

      alert("Nao foi possível atualizar o Status");
    }
  }

  useEffect(() => {
    HandlerCallDetails();
  }, []);

  return (
    <div className="w-fit">
      <Button
        svg={iconArrow}
        className="border-0 bg-transparent text-gray-300 font-normal"
        onClick={() => navigate("/")}
      >
        Voltar
      </Button>

      <div className="flex justify-between">
        <Header>Chamado detalhado</Header>

        {session?.user.role != "CLIENT" && (
          <div className="flex gap-1">
            <Button
              svg={iconDone}
              className="bg-gray-500 text-gray-200 text-[14px]"
              onClick={() => {
                handlerUpdateStatus("CLOSE");
              }}
            >
              Encerrado
            </Button>
            <Button
              svg={iconProgress}
              className="bg-gray-500 text-gray-200 text-[14px]"
              onClick={() => {
                handlerUpdateStatus("IN_PROGRESS");
              }}
            >
              Em atendimento
            </Button>
          </div>
        )}
      </div>

      <section className="flex gap-2 mt-4">
        <div className="flex flex-col gap-4">
          <div className="border border-gray-500 p-8 rounded-[10px] min-w-120">
            <div className="flex flex-col mb-6">
              <div className="flex justify-between pt-1.5 items-center">
                <span className="text-[12px] font-bold text-gray-300">
                  {id}
                </span>
                <StatusCall
                  variant={call ? call.callServices.status : "OPEN"}
                ></StatusCall>
              </div>
              <span className="font-bold">{call?.callServices.title}</span>
            </div>

            <div className="flex flex-col gap-3">
              <Textarea
                disabled
                legend="Descrição"
                defaultValue={call?.callServices.description}
                className="border-0 text-[14px]"
              ></Textarea>

              <Input
                disabled
                legend="Categoria"
                className="border-0 text-[14px] w-ful"
                value={call?.callServices.category[0].name}
              />
              <div className="flex gap-8 justify-between">
                <Input
                  legend="Criado em"
                  disabled
                  value={
                    call ? formatDateTime(call.callServices.createdAt) : ""
                  }
                  className="borde-0 text-[12px]"
                />
                <Input
                  disabled
                  legend="Atualizado em"
                  value={call ? formatDateTime(call.callServices.updateAt) : ""}
                  className="borde-0 text-[12px]"
                />
              </div>

              <div className="flex flex-col">
                <span className="font-bold uppercase text-gray-400 text-[10px]">
                  Cliente
                </span>
                <div className=" flex gap-3 items-center">
                  <div className="w-8 h-8 bg-blue-base rounded-full flex justify-center items-center">
                    <span className=" text-white">cs</span>
                  </div>
                  <div className="flex flex-col ">
                    <span className="text-gray-200 text-[14px]">
                      {call?.callServices.client}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {session?.user.role === "TECHNICAL" && (
            <div className="flex flex-col border border-gray-500 p-8 rounded-[10px] gap-6 h-fit min-w-2xs">
              <div className="flex items-center justify-between">
                <span className="font-bold uppercase text-gray-400 text-[10px]">
                  Serviços adicionais
                </span>
                <Button svg={iconPlus}></Button>
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-col border border-gray-500 p-8 rounded-[10px] gap-6 h-fit min-w-2xs">
          <div className="flex flex-col">
            <span className="font-bold text-gray-400 text-[12px]">
              Técnico responsável
            </span>
            <div className=" flex gap-3 items-center">
              <div className="w-8 h-8 bg-blue-base rounded-full flex justify-center items-center">
                <span className="text-white">cs</span>
              </div>
              <div className="flex flex-col ">
                <span className="text-gray-200 text-[14px]">
                  {call?.callServices.technicalName}
                </span>
                <span className="text-gray-300 text-[12px]">
                  {call?.callServices.technicalEmail}
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div className="w-full">
              <dt className="font-bold text-gray-400 text-[12px]">Valores</dt>

              <div className="flex w-full justify-between text-gray-200 text-[12px]">
                <span>Preço Base</span>
                <span>
                  {formatsCurrency(call?.callServices.category[0].price)}
                </span>
              </div>
            </div>

            <div>
              <span className="font-bold text-gray-400 text-[12px]">
                Adicionais
              </span>
              {call?.callServices.category.splice(1).map((item) => (
                <div
                  key={item.name}
                  className="flex gap-4 text-gray-200 text-[12px]"
                >
                  <span>{item.name}</span>
                  <span>{formatsCurrency(item.price)}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-between font-bold text-gray-200 text-[14px]">
            <span>Total</span>
            <span>{formatsCurrency(call?.callServices.totalService)}</span>
          </div>
        </div>
      </section>
    </div>
  );
}
