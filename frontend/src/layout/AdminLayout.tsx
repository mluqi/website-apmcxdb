import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../pages/Admin/components/Sidebar";

const AdminLayout: React.FC = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">

        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
