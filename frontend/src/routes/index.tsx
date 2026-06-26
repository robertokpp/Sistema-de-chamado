import { AuthRoutes } from "./auth-router";
import { BrowserRouter } from "react-router";
import { AdminRouter } from "./admin-router";
import { ClientRouter } from "./client-router";
import { useAuth } from "../hooks/useAuth";

export function Routes() {
  const { session } = useAuth();

  function Route() {
    switch (session?.user.role) {
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
