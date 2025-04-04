// DashboardLayout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '@/components/layout/header-dashboard';
import Sidebar from '@/components/layout/sidebar';

const DashboardLayout = () => {
  return (
    <div className="min-h-screen bg-[#FAFAFB] dark:bg-gray-900">
      {/* Fixed Header */}
      <header className="fixed top-0 left-0 w-full bg-white dark:bg-gray-900 shadow-md z-50">
        <Header />
      </header>

      <div className="flex">
        {/* Fixed Sidebar */}
        <aside className="fixed top-[4rem] left-0 w-64 h-[calc(100vh-4rem)] bg-white dark:bg-gray-900 shadow-md z-40">
          <Sidebar />
        </aside>
        {/* Main Content (changes based on route) */}
        <main className="flex-1 p-6 ml-64 mt-12 overflow-y-auto h-[calc(100vh-4rem)]">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
