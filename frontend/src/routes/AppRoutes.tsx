import { Routes, Route } from "react-router";

import { SignIn } from "../pages/SignIn";
export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" index element={<SignIn />} />
    </Routes>
  );
}
