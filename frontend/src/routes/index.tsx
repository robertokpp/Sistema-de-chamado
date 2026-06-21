import { AuthRoutes } from "./auth-router";
import { BrowserRouter } from "react-router";

export function Routes() {
  return (
    <BrowserRouter>
      <AuthRoutes />
    </BrowserRouter>
  );
}
