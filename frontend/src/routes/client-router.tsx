import { Routes, Route } from "react-router";

import { Aside } from "../components/Aside"

import { Client } from "../pages/Client";

export function ClientRouter() {
  return (
    <Routes>
      <Route path="/" element={<Aside />}>
        <Route path="/" element={<Client />} />
      </Route>
    </Routes>
  );
}
