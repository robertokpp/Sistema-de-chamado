import { Routes, Route } from "react-router";

import { Client } from "../pages/Client";

export function ClientRouter() {
  return (
    <Routes>
      <Route path="/client" element={<Client />} />
    </Routes>
  );
}