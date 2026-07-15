import { Routes, Route } from "react-router";
import { LayoutSideMenu } from "../components/LayoutSideMenu";
import { NotFound } from "../pages/NotFound";
import { CallTechnical } from "../pages/CallTechnical";
import { CallDetails } from "../pages/CallDetails";

export function TechnicalRouter() {
  return (
    <Routes>
      <Route path="/" element={<LayoutSideMenu />}>
        <Route path="/" index element={<CallTechnical />} />
        <Route path="/chamados/:id" element={<CallDetails />} />
      </Route>
      <Route path="/*" element={<NotFound />} />
    </Routes>
  );
}
