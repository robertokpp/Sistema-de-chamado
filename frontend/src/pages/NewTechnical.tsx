import { Header } from "../components/Header";
import { Button } from "../components/Button";
import { Input } from "../components/Inputs";
import { hours } from "../config/hours";
import { Checkbox } from "../components/Checkbox";

import { useParams } from "react-router";
import { useState, useEffect } from "react";
import { api } from "../services/api";
import { z, ZodError } from "zod";
import { useNavigate } from "react-router";
import { AxiosError } from "axios";

const createTechnicalSchema = z.object({
  name: z.string().min(3, "Digite um nome válido."),
  email: z.email(),
  password: z.string().min(6, "A senha deve conter no mínimo 6 caracteres."),
  hours: z.array(z.string()).min(1, "Selecione ao menos um horário."),
});

const updateTechnicalSchema = z.object({
  name: z.string().min(3, "Digite um nome válido."),
  email: z.email(),
  password: z
    .string()
    .min(6, "A senha deve conter no mínimo 6 caracteres.")
    .optional(),
  hours: z.array(z.string()).min(1, "Selecione ao menos um horário."),
});

export function NewTechnical() {
  const [selectedHours, setSelectedHours] = useState<string[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  async function handleLoadTechnical() {
    const response = await api.get(`/technical/${id}`);
    setName(response.data.name);
    setEmail(response.data.email);
    setSelectedHours(response.data.hours);
  }

  useEffect(() => {
    if (id) {
      handleLoadTechnical();
    }
  }, []);

  function handlerHour(hour: string, checked: boolean) {
    if (checked) {
      setSelectedHours((prev) => [...prev, hour]);
    } else {
      setSelectedHours((prev) => prev.filter((h) => h !== hour));
    }
  }

  async function HandlerOnSubmitTechnical() {
    try {
      const schema = id ? updateTechnicalSchema : createTechnicalSchema;

      const data = schema.parse({
        name,
        email,
        password: password || undefined,
        hours: selectedHours,
      });

      if (id) {
        await api.patch(`/technical/${id}`, data);
      } else {
        await api.post("/technical", data);
      }
    } catch (error) {
      console.log(error);

      if (error instanceof ZodError) {
        return alert(error.issues[0].message);
      }

      if (error instanceof AxiosError) {
        return alert(error.response?.data.message);
      }

      return { message: " Não foi possível cadastra o tecnico!" };
    }

    setName("");
    setEmail("");
    setPassword("");
    setSelectedHours([]);
  }

  function handleCancel() {
    setName("");
    setEmail("");
    setPassword("");
    setSelectedHours([]);

    navigate("/tecnicos");
  }

  return (
    <div className="w-fit">
      <div className="flex justify-between mb-4">
        <Header>Perfil de técnico</Header>
        <div className="flex gap-2">
          <Button className="bg-gray-500 text-black" onClick={handleCancel}>
            Cancelar
          </Button>
          <Button onClick={HandlerOnSubmitTechnical}>Salvar</Button>
        </div>
      </div>
      <section className="flex gap-4">
        <div className="flex flex-col p-7 w-100 rounded-2xl border border-[#E3E5E8]">
          <div className="mb-4">
            <h2 className="text-[20px] text-gray-100 font-bold">
              Dados pessoais
            </h2>
            <span className="text-[12px] text-gray-300 leading-4">
              Defina as informações do perfil de técnico
            </span>
          </div>
          <div className="flex flex-col gap-2">
            <Input
              required
              legend="Name"
              value={name}
              placeholder="Digite o nome completo"
              onChange={(e) => setName(e.target.value)}
            />

            <Input
              required
              legend="E-mail"
              type="email"
              value={email}
              placeholder="exemplo@email.com"
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              required
              legend="Senha"
              type="password"
              value={password}
              placeholder="Digite sua senha"
              onChange={(e) => setPassword(e.target.value)}
            />
            <span className="text-gray-400 text-[12px] italic">
              Mínimo de 6 digito
            </span>
          </div>
        </div>

        <div className="gap-2 p-7 rounded-2xl border border-[#E3E5E8]">
          <div className="mb-4">
            <h2 className="text-[20px] text-gray-100 font-bold">
              Horários de atendimento{" "}
            </h2>
            <span className="text-[12px] text-gray-300 leading-4">
              Selecione os horários de disponibilidade do técnico para
              atendimento
            </span>
          </div>

          <div className="flex flex-col gap-5">
            <div>
              <span className="uppercase">Manhã</span>
              <div className="flex gap-2">
                {hours.map((hour) =>
                  hour <= "12:00" ? (
                    <Checkbox
                      key={hour}
                      checked={selectedHours.includes(hour)}
                      onChange={(checked) => handlerHour(hour, checked)}
                    >
                      {hour}
                    </Checkbox>
                  ) : null,
                )}
              </div>
            </div>
            <div>
              <span className="uppercase">tarde</span>
              <div className="flex gap-2">
                {hours.map((hour) =>
                  hour > "12:00" && hour <= "18:00" ? (
                    <Checkbox
                      key={hour}
                      checked={selectedHours.includes(hour)}
                      onChange={(checked) => handlerHour(hour, checked)}
                    >
                      {hour}
                    </Checkbox>
                  ) : null,
                )}
              </div>
            </div>
            <div>
              <span className="uppercase">noite</span>
              <div className="flex gap-2">
                {hours.map((hour) =>
                  hour > "18:00" ? (
                    <Checkbox
                      key={hour}
                      checked={selectedHours.includes(hour)}
                      onChange={(checked) => handlerHour(hour, checked)}
                    >
                      {hour}
                    </Checkbox>
                  ) : null,
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
