import { Routes, Route } from "react-router";

import { SignIn } from "../pages/SignIn";
import { SignUp } from "../pages/SignUp";
import { Client } from "../pages/Client";

export function AuthRoutes() {
  return (
    <Routes>
      <Route path="/" element={<SignIn />} />
      <Route path="/cadastrar" element={<SignUp />} />
      <Route path="/client" element={<Client />} />
    </Routes>
  );
}
