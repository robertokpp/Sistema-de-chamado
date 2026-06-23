import { AuthRoutes } from "./auth-router";
import { BrowserRouter } from "react-router";
import { AdminRouter } from "./admin-router"; 
import { ClientRouter } from "./client-router";

export function Routes() {
  let role = "ADMIN";

  function Route() {
    switch (role) {
      case "CLIENT":
        return <ClientRouter />;
      case "ADMIN":
        return <AdminRouter />;
      default:
        return <AuthRoutes />;
    }
  }

  return (
    <BrowserRouter>
      <Route />
    </BrowserRouter>
  );
}
