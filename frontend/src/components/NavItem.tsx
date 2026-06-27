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
      className={({ isActive }) =>
        `group flex gap-3 p-3 items-center rounded-[5px] ${isActive ? "bg-blue-dark text-white" : "text-gray-400 hover:bg-blue-dark hover:text-white"} `
      }
    >
      {({ isActive }) => (
        <>
          <img
            src={icon}
            alt=""
            className={`w-5 h-5 ${
              isActive
                ? "brightness-0 invert"
                : "group-hover:brightness-0 group-hover:invert"
            }`}
          />
          <span className="text-[14px] whitespace-nowrap">{title}</span>
        </>
      )}
    </NavLink>
  );
}

//" group-hover:invert"
