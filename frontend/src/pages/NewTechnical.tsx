import { Header } from "../components/Header";
import { Button } from "../components/Button";
import { Input } from "../components/Inputs";
import { api } from "../services/api";
import { AxiosError } from "axios";
import { z, ZodError } from "zod";
import { useState } from "react";

const bodySchema = z.object({
  name: z.string().trim().min(3),
  email: z.email(),
  password: z.string().min(6),
});

export function NewTechnical() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function onSubmit(event: React.SubmitEvent) {
    event.preventDefault();
    try {
      const data = bodySchema.parse({
        name,
        email,
        password,
      });

      await api.post("/user", data);
    } catch (error) {
      console.log(error);
      if (error instanceof ZodError) {
        return alert(error.issues[0].message);
      }
      if (error instanceof AxiosError) {
        return alert(error.response?.data.message);
      }

      alert("Erro ao cadastrar Técnico.");
    }
  }

  return (
    <>
      <div className="flex justify-between w-full">
        <Header>Perfil de técnico</Header>
        <div className="flex gap-2">
          <Button>Cancelar</Button>
          <Button>Salvar</Button>
        </div>
      </div>
      <section className="flex gap-4">
        <div className="flex flex-col p-7 w-100 rounded-2xl border border-[#E3E5E8]">
          <div>
            <h2 className="text-[20px] text-gray-100 font-bold">
              Dados pessoais
            </h2>
            <span className="text-[12px] text-gray-300 leading-4">
              Defina as informações do perfil de técnico
            </span>
          </div>
          <Input
            required
            legend="Name"
            placeholder="Digite o nome completo"
            onChange={(e) => setName(e.target.value)}
          />

          <Input
            required
            legend="E-mail"
            type="email"
            placeholder="exemplo@email.com"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            required
            legend="Senha"
            type="password"
            placeholder="Digite sua senha"
            onChange={(e) => setPassword(e.target.value)}
          />
          <span className="text-gray-400 text-[12px] italic">
            Mínimo de 6 digito
          </span>
        </div>

        <div className="flex flex-col p-7 w-100 rounded-2xl border border-[#E3E5E8]">
          <h1>teste</h1>
        </div>
      </section>
    </>
  );
}
