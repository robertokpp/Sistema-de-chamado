import { Routes, Route } from "react-router";

import { Aside } from "../components/Aside";

import { Calls } from "../pages/Calls";
import { NewCall } from "../pages/NewCall";
import { Details } from "../pages/Details";

export function ClientRouter() {
  return (
    <Routes>
      <Route path="/" element={<Aside />}>
        <Route path="/" index element={<Calls />} />
        <Route path="/chamados/:id" element={<Details />} />
        <Route path="/novo-chamado" element={<NewCall />} />
      </Route>
    </Routes>
  );
}
