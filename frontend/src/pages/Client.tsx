import { SideMenu } from "../components/Menu";

export function Client() {
  return (
    <div className="bg-gray-200">
      <div className="flex">
        <SideMenu />
        <div className="bg-white rounded-tl-[20px] mt-3">
          <h1>teste</h1>
        </div>
      </div>
    </div>
  );
}
