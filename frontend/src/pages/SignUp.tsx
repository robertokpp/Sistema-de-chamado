import { Button } from "../components/Button";
import { Input } from "../components/Inputs";
import { useNavigate } from "react-router";
import { api } from "../services/api";
import { AxiosError } from "axios";
import { z, ZodError } from "zod";
import { useState } from "react";

const signUpSchema = z.object({
  name: z.string().trim().min(3),
  email: z.email(),
  password: z.string().min(6),
});

export function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function signIn() {
    navigate("/");
  }

  async function onSubmit(event: React.SubmitEvent) {
    event.preventDefault();
    try {
      const data = signUpSchema.parse({
        name,
        email,
        password,
      });

      await api.post("/user", data);

      if (confirm("Cadastrado com sucesso, Ir para tela de entrar?")) {
        navigate("/");
      }

      setName("");
      setEmail("");
      setPassword("");
    } catch (error) {
      console.log(error);
      if (error instanceof ZodError) {
        return alert(error.issues[0].message);
      }
      if (error instanceof AxiosError) {
        return alert(error.response?.data.message);
      }

      alert("Erro ao cadastrar Usuário.");
    }
  }

  return (
    <>
      <section className="flex flex-col p-7 w-100 rounded-2xl border border-[#E3E5E8]  max-lg:w-full">
        <div>
          <h2 className="text-[20px] text-gray-100 font-bold">
            Crie sua conta
          </h2>
          <span className="text-[12px] text-gray-300 leading-4">
            Informe seu nome, e-mail e senha
          </span>
        </div>

        <form className="pt-10 flex flex-col gap-4" onSubmit={onSubmit}>
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
          <Button className="mt-10" type="submit">
            Cadastrar
          </Button>
        </form>
      </section>

      <section className="flex flex-col p-7 rounded-2xl border border-[#E3E5E8]">
        <h3>Já uma conta?</h3>
        <span className="text-[12px] text-gray-300 leading-4">
          Entre agora mesmo
        </span>

        <Button className="text-gray-200 bg-[#E3E5E8] mt-6" onClick={signIn}>
          Acessar conta
        </Button>
      </section>
    </>
  );
}
