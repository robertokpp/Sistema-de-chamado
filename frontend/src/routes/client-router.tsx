import { Routes, Route } from "react-router";

import { Aside } from "../components/Aside";

import { Calls } from "../pages/Calls";
import { NewCall } from "../pages/NewCall";
import { Details } from "../pages/Details";

export function ClientRouter() {
  return (
    <Routes>
      <Route path="/" element={<Aside />}>
        <Route path="/********" element={<Calls />} />
        <Route path="/novo-chamado" element={<NewCall />} />
        <Route path="/" element={<Details />} />
      </Route>
    </Routes>
  );
}
