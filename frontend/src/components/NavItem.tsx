import { NavLink } from "react-router";


type props = {
  title: string;
  path: string;
  icon: string;
};

export function NavItem({ title, path, icon }: props) {
  return (
    <NavLink
      to={path}
      className="group flex gap-3 p-3 text-gray-400 items-center hover:bg-blue-dark hover:text-white rounded-[5px]"
    >
      <img
        src={icon}
        alt="iconMyCalls"
        className="w-5 h-5 group-hover:brightness-0 group-hover:invert"
      />
      <span className="text-[14px] whitespace-nowrap">{title}</span>
    </NavLink>
  );
}
