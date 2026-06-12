import logoDark from "../assets/Logo_IconDark.svg";

export function SideMenu() {
  return (
    <div className="px-5 py-6 flex flex-col justify-between h-screen w-fit">
      <div className="flex gap-3 ">
        <img src={logoDark} alt="logo Dark" className="w-11 h-11" />
        <div className="flex flex-col">
          <span className="text-gray-500 font-bold text-[20px] ">HelpDesk</span>
          <span className="uppercase text-[#8996EB] text-[10px] font-bold">
            Cliente
          </span>
        </div>
      </div>

      <div className="flex gap-3 items-center">
        <div className="bg-[#2E3DA3] w-8 h-8 rounded-full flex justify-center items-center">
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
