import { Header } from "../components/Header";
import { Button } from "../components/Button";
import { Input } from "../components/Inputs";
import { hours } from "../config/hours";
import { Checkbox } from "../components/Checkbox";

import { useState } from "react";
import { api } from "../services/api";
import { z } from "zod";
import { useNavigate } from "react-router";

const bodySchema = z.object({
  name: z.string().min(3, "Digite um nome valido."),
  email: z.email(),
  password: z.string().min(6, "A Senha de conter no mínimo 6 caracteres."),
  hours: z.array(z.string()).min(1, "Selecione ao menos um horário."),
});

export function NewTechnical() {
  const [selectedHours, setSelectedHours] = useState<string[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function handlerHour(hour: string, checked: boolean) {
    if (checked) {
      setSelectedHours((prev) => [...prev, hour]);
    } else {
      setSelectedHours((prev) => prev.filter((h) => h !== hour));
    }
  }

  function cancel() {
    setName("");
    setEmail("");
    setPassword("");
    setSelectedHours([]);

    navigate("/tecnicos");
  }

  async function save() {
    const data = bodySchema.parse({
      name,
      email,
      password,
      hours: selectedHours,
    });

    await api.post("/technical", data);

    alert("passou aqui");

    setName("");
    setEmail("");
    setPassword("");
    setSelectedHours([]);
  }
  return (
    <div className="w-fit">
      <div className="flex justify-between mb-4">
        <Header>Perfil de técnico</Header>
        <div className="flex gap-2">
          <Button onClick={cancel}>Cancelar</Button>
          <Button onClick={save}>Salvar</Button>
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
