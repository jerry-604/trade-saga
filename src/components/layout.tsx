import React, { useState } from 'react';
import Sidebar from './sidebar';

export default function Layout({ children }) {
  const [sidebarWidth, setSidebarWidth] = useState(325); // default sidebar width in pixels

  const toggleSidebar = () => {
    setSidebarWidth(sidebarWidth === 325 ? 70 : 325); // Toggle between 300px and 70px
  };

  return (
    <div className="flex h-screen bg-[#F5F7F9]">
      <div style={{ zIndex: 1000 }}>
        <Sidebar onToggleSidebar={toggleSidebar} />
      </div>
      <main className="flex-grow overflow-auto pr-0 pt-0 transition-all duration-300" style={{ marginLeft: `${sidebarWidth}px` }}>
        {children}
      </main>
    </div>
  );
}
