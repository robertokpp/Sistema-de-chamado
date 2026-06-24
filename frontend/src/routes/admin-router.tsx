import { Routes, Route } from "react-router";

import { LayoutSideMenu } from "../components/LayoutSideMenu";

import { Calls } from "../pages/Calls";

export function AdminRouter() {
  return (
    <Routes>
      <Route path="/" element={<LayoutSideMenu />}>
        <Route path="/" element={<Calls />} />
      </Route>
    </Routes>
  );
}
