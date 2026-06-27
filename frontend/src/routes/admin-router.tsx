import { Routes, Route } from "react-router";

import { LayoutSideMenu } from "../components/LayoutSideMenu";

import { Calls } from "../pages/Calls";
import { NotFound } from "../pages/NotFound";
export function AdminRouter() {
  return (
    <Routes>
      <Route path="/" element={<LayoutSideMenu />}>
        <Route path="/" element={<Calls />} />
      </Route>
      <Route path="/*" element={<NotFound />} />
    </Routes>
  );
}
