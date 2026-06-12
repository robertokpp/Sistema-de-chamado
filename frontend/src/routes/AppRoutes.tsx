import { Routes, Route } from "react-router";

import { SignIn } from "../pages/SignIn";
import { SignUp } from "../pages/SignUp";
import { Client } from "../pages/client";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" index element={<Client />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
    </Routes>
  );
}
