export function Home() {
  return (
    <div className="w-screen h-screen">
      <form className="flex flex-col justify-end">
        <h1>Crie sua conta</h1>
        <span>Informe seu nome, e-mail e senha</span>

        <input type="text" placeholder="Digite o nome completo" />
        <input type="text" placeholder="exemplo@email.com" />
        <input type="text" placeholder="Digite sua senha" />
        <span>Mínimo de 6 digito</span>
      </form>
    </div>
  );
}
