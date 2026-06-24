import { Button } from "../components/Button";
import { Input } from "../components/Inputs";
import { api } from "../services/api";
import { useNavigate } from "react-router";
import { useState } from "react";
import { ZodError } from "zod";
import { AxiosError } from "axios";
import { z } from "zod";

import logo from "../assets/Logo_IconLight.svg";

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
    } finally {
    }
  }

  return (
    <div
      className="flex justify-end pt-4 bg-cover bg-center bg-no-repeat  w-full h-full"
      style={{ backgroundImage: "url('/src/assets/Login_Background.png')" }}
    >
      <div className="flex flex-col gap-3 h-screen py-12 px-36 bg-[#F9FAFA] rounded-tl-4xl">
        <div className="flex justify-center items-center gap-3 mb-8">
          <img className="w-10 h-10" src={logo} alt="Logo" />
          <span className="text-[#2E3DA3] font-bold text-2xl ">HelpDesk</span>
        </div>

        <div className="flex flex-col p-7 bg-[#F9FAFA]  rounded-2xl border border-[#E3E5E8]">
          <div>
            <h1 className="text-[20px] text-gray-100 font-bold">
              Crie sua conta
            </h1>
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
        </div>

        <div className="flex flex-col p-7 w-100 bg-[#F9FAFA] rounded-2xl border border-[#E3E5E8]">
          <h2>Já uma conta?</h2>
          <span className="text-[12px] text-gray-300 leading-4">
            Entre agora mesmo
          </span>

          <Button className="text-gray-200 bg-[#E3E5E8] mt-6" onClick={signIn}>
            Acessar conta
          </Button>
        </div>
      </div>
    </div>
  );
}
