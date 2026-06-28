import { Link } from "react-router";

type props = {
  to: string;
  children: string;
};

export function BtnLink({ to, children }: props) {
 return <Link to={to}>{children}</Link>;
}
