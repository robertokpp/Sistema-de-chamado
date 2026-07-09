import { Routes, Route } from "react-router";

import { LayoutSideMenu } from "../components/LayoutSideMenu";

import { Calls } from "../pages/Calls";
import { Services } from "../pages/Services";
import { NotFound } from "../pages/NotFound";
import { Technical } from "../pages/Technical";
import { NewTechnical } from "../pages/NewTechnical";
import { CallDetails } from "../pages/CallDetails";
import { Client } from "../pages/Client";

export function AdminRouter() {
  return (
    <Routes>
      <Route path="/" element={<LayoutSideMenu />}>
        <Route path="/" index element={<Calls />} />
        <Route path="/chamado/:id" element={<CallDetails />} />
        <Route path="/serviços" element={<Services />} />
        <Route path="/tecnicos" element={<Technical />} />
        <Route path="/clientes" element={<Client />} />
        <Route path="/novo-tecnico" element={<NewTechnical />} />
      </Route>

      <Route path="/*" element={<NotFound />} />
    </Routes>
  );
}
