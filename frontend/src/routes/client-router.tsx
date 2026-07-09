import { Routes, Route } from "react-router";

import { LayoutSideMenu } from "../components/LayoutSideMenu";

import { Calls } from "../pages/Calls";
import { CallDetails } from "../pages/CallDetails";
import { NotFound } from "../pages/NotFound";
import { NewCall } from "../pages/NewCall";

export function ClientRouter() {
  return (
    <Routes>
      <Route path="/" element={<LayoutSideMenu />}>
        <Route path="/" index element={<Calls />} />
        <Route path="/chamado/:id" element={<CallDetails />} />
        <Route path="/novo-chamado" element={<NewCall />} />
      </Route>
      <Route path="/*" element={<NotFound />} />
    </Routes>
  );
}
