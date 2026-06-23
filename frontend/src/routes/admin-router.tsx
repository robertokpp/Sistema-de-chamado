import { Routes, Route } from "react-router";

import { Aside } from "../components/Aside";

import { Calls } from "../pages/Calls";


export function AdminRouter() {
  return (
    <Routes>
      <Route path="/" element={<Aside />}>
        <Route path="/" element={<Calls />} />
      </Route>
    </Routes>
  );
}