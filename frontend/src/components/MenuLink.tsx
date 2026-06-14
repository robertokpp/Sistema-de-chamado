import  myCalls  from "../assets/mycalls.svg";
import newCall from "../assets/newcall.svg"
export function MyCalls() {
  return (
    <a className="group flex gap-3 p-3 text-gray-400 items-center hover:bg-blue-dark hover:text-white rounded-[5px]">
      <img src={myCalls} alt="iconMyCalls" className="w-5 h-5 group-hover:brightness-0 group-hover:invert"/>
      <span className="text-[14px] whitespace-nowrap">Meus chamados</span>
    </a>
  );
}

export function NewCall() {
  return (
    <a className="group flex items-center gap-3 p-3 text-gray-400 rounded-[5px]  hover:bg-blue-dark hover:text-white">
      <img src={newCall} alt="iconMyCalls" className="w-5 h-5 group-hover:brightness-0 group-hover:invert"/>
      <span className="text-[14px] whitespace-nowrap">Criar chamado</span>
    </a>
  );
}