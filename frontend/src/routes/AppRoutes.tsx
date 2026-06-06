import { Routes, Route } from "react-router";
import { Home } from "../pages/SignUp";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" index element={<Home />} />
    </Routes>
  );
}
