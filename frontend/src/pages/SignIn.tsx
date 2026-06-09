import { Button } from "../components/Button";
import { Input } from "../components/Inputs";

import logo from "../assets/Logo_IconLight.svg";

export function SignIn() {
  return (
    <div
      className="flex pt-4 bg-cover bg-center bg-no-repeat justify-end w-screen h-screen"
      style={{ backgroundImage: "url('/src/assets/Login_Background.png')" }}
    >
      <div className="flex flex-col gap-3 h-full py-12 px-36 bg-[#F9FAFA] rounded-tl-4xl">
        <div className="flex justify-center items-center gap-3 mb-8">
          <img className="w-10 h-10" src={logo} alt="Logo" />
          <span className="text-[#2E3DA3] font-bold text-2xl ">HelpDesk</span>
        </div>

        <div className="flex flex-col p-7 bg-[#F9FAFA]  rounded-2xl border border-[#E3E5E8]">
          <div>
            <h1 className="text-[20px] text-gray-100 font-bold">
              Acesse o portal
            </h1>
            <span className="text-[12px] text-gray-300 leading-4">
              Entre usando seu e-mail e senha cadastrados
            </span>
          </div>

          <form className="pt-10 flex flex-col gap-4">
            <Input legend="E-mail" placeholder="exemplo@email.com" />
            <Input legend="Senha" placeholder="Digite sua senha" />
            <Button className="mt-10" type="submit">
              Entrar
            </Button>
          </form>
        </div>

        <div className="flex flex-col p-7 w-100 bg-[#F9FAFA] rounded-2xl border border-[#E3E5E8]">
          <h2>Ainda não tem uma conta?</h2>
          <span className="text-[12px] text-gray-300 leading-4">
            Cadastre agora mesmo
          </span>

          <Button className="text-gray-200 bg-[#E3E5E8] mt-6">
            Criar conta
          </Button>
        </div>
      </div>
    </div>
  );
}
