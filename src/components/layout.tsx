import React, { useState } from 'react';
import Sidebar from './sidebar';

export default function Layout({ children }) {
  const [sidebarWidth, setSidebarWidth] = useState('300px'); // default sidebar width


  const toggleSidebar = () => {
    setSidebarWidth(currentWidth => currentWidth === '300px' ? '70px' : '300px'); // toggle between expanded and collapsed widths
  };

  return (
    <div className="flex h-screen bg-[#F5F7F9]">

      <div className="flex-none" style={{  zIndex: 1000 }}>
        <Sidebar onToggleSidebar={toggleSidebar} />
      </div>
      <main className={`flex-grow overflow-auto  pr-0 pt-0 duration-300 transition-ml ml-[${sidebarWidth}]`} >
        {children}
      </main>
    </div>
  );
}
