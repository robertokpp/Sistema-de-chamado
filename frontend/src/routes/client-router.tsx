import { Routes, Route } from "react-router";

import { LayoutSideMenu } from "../components/LayoutSideMenu";

import { Calls } from "../pages/Calls";
import { NewCall } from "../pages/NewCall";
import { Details } from "../pages/Details";
import { NotFound } from "../pages/NotFound";

export function ClientRouter() {
  return (
    <Routes>
      <Route path="/" element={<LayoutSideMenu />}>
        <Route path="/" index element={<Calls />} />
        <Route path="/chamados/:id" element={<Details />} />
        <Route path="/novo-chamado" element={<NewCall />} />
      </Route>
      <Route path="/*" element={<NotFound />} />
    </Routes>
  );
}
