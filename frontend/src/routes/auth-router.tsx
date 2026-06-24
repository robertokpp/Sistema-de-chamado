import { Routes, Route } from "react-router";

import { SignIn } from "../pages/SignIn";
import { SignUp } from "../pages/SignUp";
import { LayoutSign } from "../components/LayoutSign";

export function AuthRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LayoutSign />}>
        <Route path="/" index element={<SignIn />} />
        <Route path="/cadastrar" element={<SignUp />} />
      </Route>
    </Routes>
  );
}
