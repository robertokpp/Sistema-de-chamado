import { Routes, Route } from "react-router";

import { Aside } from "../components/Aside";

import { Client } from "../pages/Client";
import { NewCall } from "../pages/newCall";

export function ClientRouter() {
  return (
    <Routes>
      <Route path="/" element={<Aside />}>
        <Route path="/client" element={<Client />} />
        <Route path="/" element={<NewCall />} />
      </Route>
    </Routes>
  );
}
