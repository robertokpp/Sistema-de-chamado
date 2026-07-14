import { Routes, Route } from "react-router";
import { LayoutSideMenu } from "../components/LayoutSideMenu";
import { NotFound } from "../pages/NotFound";
import { CallTechnical } from "../pages/CallTechnical"; 

export function TechnicalRouter() {
  return (
    <Routes>
      <Route path="/" element={<LayoutSideMenu />}>
        <Route path="/" index element={<CallTechnical />} />
      </Route>
      <Route path="/*" element={<NotFound />} />
    </Routes>
  );
}
