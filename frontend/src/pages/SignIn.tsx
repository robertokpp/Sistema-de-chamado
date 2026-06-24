import { Button } from "../components/Button";
import { Input } from "../components/Inputs";
import { useState } from "react";
import { api } from "../services/api";
import { z } from "zod";
import { useNavigate } from "react-router";

const SignInSchema = z.object({
  email: z.email(),
  password: z.string().min(1),
});

export function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function signUp() {
    navigate("/cadastrar");
  }

  async function onSubmit(e: React.SubmitEvent) {
    e.preventDefault();

    const data = SignInSchema.parse({
      email,
      password,
    });

    const response = await api.post("/session", data);

    console.log(response.data);
  }

  return (
    <>
      <section className="flex flex-col p-7 w-100 rounded-2xl border border-[#E3E5E8]">
        <div>
          <h2 className="text-[20px] text-gray-100 font-bold">
            Acesse o portal
          </h2>
          <span className="text-[12px] text-gray-300 leading-4">
            Entre usando seu e-mail e senha cadastrados
          </span>
        </div>

        <form className="pt-10 flex flex-col gap-4" onSubmit={onSubmit}>
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

          <Button className="mt-10" type="submit" disabled={false}>
            Entrar
          </Button>
        </form>
      </section>

      <section className="flex flex-col p-7 w-100 rounded-2xl border border-[#E3E5E8]">
        <h2>Ainda não tem uma conta?</h2>
        <span className="text-[12px] text-gray-300 leading-4">
          Cadastre agora mesmo
        </span>

        <Button className="text-gray-200 bg-[#E3E5E8] mt-6" onClick={signUp}>
          Criar conta
        </Button>
      </section>
    </>
  );
}
