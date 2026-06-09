import { Button } from "../components/Button";
import { Input } from "../components/Inputs";

export function Home() {
  return (
    <div
      className="flex flex-col gap-4 justify-center h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/src/assets/Login_Background.png')" }}
    >
      <div>
        <div className="flex flex-col p-7 w-100 h-195.25 bg-white rounded-2xl">
          <div>
            <h1 className="text-[20px] text-gray-100 font-bold">
              Crie sua conta
            </h1>
            <span className="text-[12px] text-gray-300 leading-4">
              Informe seu nome, e-mail e senha
            </span>
          </div>

          <form className="py-10 flex flex-col gap-4">
            <Input legend="Name" placeholder="Digite o nome completo" />
            <Input legend="E-mail" placeholder="exemplo@email.com" />
            <Input legend="Senha" placeholder="Digite sua senha" />
            <span className="text-gray-400 text-[12px] italic">
              Mínimo de 6 digito
            </span>
            <Button type="submit">Cadastrar</Button>
          </form>
        </div>

        <div className="flex flex-col p-7 w-100 bg-white rounded-2xl">
          <h2>Já uma conta?</h2>
          <span className="text-[12px] text-gray-300 leading-4">
            Entre agora mesmo
          </span>

          <Button className="text-gray-200 bg-gray-500 mt-6">
            Acessar conta
          </Button>
        </div>
      </div>
    </div>
  );
}
