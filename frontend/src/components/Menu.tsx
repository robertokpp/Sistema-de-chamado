import logoDark from "../assets/Logo_IconDark.svg";
import { MyCalls, NewCall } from "./MenuLink";

let role = "client";

export function SideMenu() {
  return (
    <div className="px-5 py-6 flex flex-col justify-between h-screen w-fit bg-gray-200 mt-3">
      <div>
        <div className="flex gap-3 py-5">
          <img src={logoDark} alt="logo Dark" className="w-11 h-11" />
          <div className="flex flex-col">
            <span className="text-gray-500 font-bold text-[20px] ">
              HelpDesk
            </span>
            <span className="uppercase text-[#8996EB] text-[10px] font-bold">
              Cliente
            </span>
          </div>
        </div>

        {role === "client" && (
          <div className="flex flex-col gap-1 pt-5">
            <MyCalls />
            <NewCall />
          </div>
        )}

      </div>
      <div className="flex gap-3 items-center">
        <div className="bg-blue-dark w-8 h-8 rounded-full flex justify-center items-center">
          <span className="text-gray-500 text[14px]">UC</span>
        </div>
        <div className="flex flex-col">
          <span className="text-gray-500 text[14px]">Usuário Cliente</span>
          <span className="text-gray-400 text-[12px]">
            user.client@test.com
          </span>
        </div>
      </div>
    </div>
  );
}
