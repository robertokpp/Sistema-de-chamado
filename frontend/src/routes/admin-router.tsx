import { Routes, Route } from "react-router";

import { LayoutSideMenu } from "../components/LayoutSideMenu";

import { Calls } from "../pages/Calls";
import { Services } from "../pages/Services";
import { NotFound } from "../pages/NotFound";
export function AdminRouter() {
  return (
    <Routes>
      <Route path="/" element={<LayoutSideMenu />}>
        <Route path="/" index element={<Calls />} />
        <Route path="/serviços" element={<Services />} />
      </Route>
      <Route path="/*" element={<NotFound />} />
    </Routes>
  );
}
