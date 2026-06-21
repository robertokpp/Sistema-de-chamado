import { AuthRoutes } from "./auth-router";
import { BrowserRouter } from "react-router";
import { ClientRouter } from "./client-router";

export function Routes() {
  const role = "CLIENT";

  function Route() {
    switch (role) {
      case "CLIENT":
        return <ClientRouter />;
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
