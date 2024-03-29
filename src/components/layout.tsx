import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Sidebar from './sidebar';

export default function Layout({ children }: any) {
  const [sidebarWidth, setSidebarWidth] = useState(325); // default sidebar width in pixels
  const { pathname } = useRouter(); // Destructure pathname from the useRouter hook

  const toggleSidebar = () => {
    setSidebarWidth(sidebarWidth === 325 ? 70 : 325); // Toggle between 300px and 70px
  };

  return (
    <div className="flex h-screen bg-[#F5F7F9]">
      {pathname!== '/' && (
        <div >
          <Sidebar onToggleSidebar={toggleSidebar} />
        </div>
      )}
      <main className={`flex-grow overflow-auto pr-0 pt-0 transition-all duration-300 ${pathname === '/' ? 'ml-0' : ''}`} style={{ marginLeft: pathname !== '/' ? `${sidebarWidth}px` : '0' }}>
        {children}
      </main>
    </div>
  );
}
