import { Link } from "react-router"

export function NotFound(){
  return (
    <div className="flex flex-col justify-center items-center w-screen h-screen">
      <h1>PAGINA NAO EXISTE</h1>
      <Link to="/">
      voltar
      </Link>
    </div>
  )
}