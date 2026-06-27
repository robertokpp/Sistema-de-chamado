import logoDark from "../assets/Logo_IconDark.svg";
import { Outlet } from "react-router";

import { useAuth } from "../hooks/useAuth";
import { NavItem } from "./NavItem";
import { menu } from "../config/menu";

export function LayoutSideMenu() {
  const { session } = useAuth();

  return (
    <div className="flex bg-gray-200">
      <aside className="px-5 py-6 flex flex-col justify-between h-screen w-fit bg-gray-200 mt-3">
        <div>
          <header className="flex gap-3 py-5">
            <img src={logoDark} alt="logo Dark" className="w-11 h-11" />
            <div className="flex flex-col">
              <span className="text-gray-500 font-bold text-[20px] ">
                HelpDesk
              </span>
              <span className="uppercase text-[#8996EB] text-[10px] font-bold">
                {session?.user.role}
              </span>
            </div>
          </header>
          <nav>
            {items.map((item) => (
              <NavItem
                key={item.path}
                title={item.title}
                path={item.path}
                icon={item.icon}
              />
            ))}
          </nav>
        </div>

        <footer className="flex gap-3 items-center">
          <div className="bg-blue-dark w-8 h-8 rounded-full flex justify-center items-center">
            <span className="text-gray-500 text[14px]">UC</span>
          </div>
          <div className="flex flex-col">
            <span className="text-gray-500 text[14px] text-nowrap">
              {session?.user.name}
            </span>
            <span className="text-gray-400 text-[12px]">
              {session?.user.email}
            </span>
          </div>
        </footer>
      </aside>

      <main className="bg-white rounded-tl-[20px] mt-3 w-full p-12 flex flex-col items-center">
        <Outlet />
      </main>
    </div>
  );
}
