import logo from "../assets/Logo_IconLight.svg";
import { Outlet } from "react-router";

export function LayoutSign() {
  return (
    <div
      className="flex justify-end pt-4 h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/src/assets/Login_Background.png')" }}
    >
      <main className="flex flex-col gap-3 py-12 px-36 bg-[#F9FAFA] rounded-tl-4xl ">
        <header className="flex justify-center items-center gap-3 mb-8">
          <img className="w-10 h-10" src={logo} alt="Logo" />
          <span className="text-[#2E3DA3] font-bold text-2xl ">HelpDesk</span>
        </header>

        <Outlet />
      </main>
    </div>
  );
}
