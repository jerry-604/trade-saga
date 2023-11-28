import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { List, ListItem, ListItemIcon, ListItemText, IconButton, Divider } from '@mui/material';
import { Home, Dashboard, Announcement, Help, Settings, ChevronLeft, ChevronRight } from '@mui/icons-material';
import { FiHome, FiTrello, FiRss } from "react-icons/fi";
import { BsFillQuestionCircleFill, BsFillArrowUpRightCircleFill } from "react-icons/bs";

export default function Sidebar({ onToggleSidebar }) {
  const router = useRouter();
  const currentRoute = router.pathname;
  const [collapsed, setCollapsed] = useState(false);

  const sidebarItems = [
    { icon: <FiHome size="25px"/>, text: 'Home', path: '/home' },
    { icon: <FiTrello size="25px"/>, text: 'Stock Dashboard', path: '/dashboard' },
    { icon: <FiRss size="25px"/>, text: 'News', path: '/news' },
  ];

  const bottomItems = [
    { icon: <BsFillQuestionCircleFill size="25px" />, text: 'How To Play', path: '/how-to' },
    { icon: <BsFillArrowUpRightCircleFill size="25px" />, text: 'Settings', path: '/profile' },
  ];

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
    onToggleSidebar();
  };

  return (
    <div className={`sidebar fixed top-0 bottom-0 lg:left-0 ${collapsed ? 'p-2' : 'p-5'} ${collapsed ? 'w-[70px]' : 'w-[325px]'} overflow-y-auto text-center bg-white border-r border-[#EBEEF3] transition-width duration-300`}>
      {/* Top Section */}
      <div className="text-[#424242]-100 text-xl">
        <div className="h-[54px] p-2.5 mt-1 flex items-center justify-center">
          { <CircleWithT />}
          {collapsed ? null : <h1 className="font-bold text-[#424242]-200 text-[18px] ml-3 text-[#424242]">
            TradeSaga
          </h1>}
        </div>
      </div>

      {/* Sidebar stuffs */}
      <List component="nav">
        {sidebarItems.map((item, index) => (
          <Link href={item.path} key={index} passHref>
            <ListItem
              button
              selected={currentRoute === item.path}
              sx={{
                borderRadius: '10px',
                '&:hover': {
                  backgroundColor: '#F4F6F8',
                },
                '&.Mui-selected': {
                  backgroundColor: '#F4F6F8',
                },
                '&.Mui-selected:hover': {
                  backgroundColor: '#F6F8FA',
                },
                marginTop: "22px",
                marginBottom: "22px",
              }}
            >
              <ListItemIcon sx={{color: "#424242", marginLeft: !collapsed ? 0 : "-2px"}}>
                {item.icon}
              </ListItemIcon>
              {!collapsed && <ListItemText primary={<span style={{color: "#424242", fontSize: "18px", fontWeight: "bold"}} className="font-sans">{item.text}</span>} />}
            </ListItem>
          </Link>
        ))}
      </List>
              
        {/* Bottom Section stuffs */}
      <div className={`absolute bottom-[10px] sm:left-0 ${collapsed ? 'p-2' : 'p-5'} ${collapsed ? 'w-[70px]' : 'w-[325px] '} overflow-y-auto text-center bg-white border-r border-[#EBEEF3] transition-width duration-300`}>
        <List component="nav">
        <Divider sx={{ my: 2 }} />
          {bottomItems.map((item, index) => (
            <Link href={item.path} key={index} passHref>
              <ListItem
                button
                sx={{
                  borderRadius: '10px',
                  '&:hover': {
                    backgroundColor: '#F4F6F8',
                  },
                }}
              >
                <ListItemIcon sx={{color: "black", marginLeft: !collapsed ? 0 : "-2px"}}>
                  {item.icon}
                </ListItemIcon>
                {!collapsed && <ListItemText primary={<span style={{color: "#424242", fontSize: "18px", fontWeight: "bold"}} className="font-sans">{item.text}</span>} />}
              </ListItem>
            </Link>
          ))}
          <IconButton onClick={toggleCollapse} sx={{ mx: 'auto', mt:'10px' }}>
            {collapsed ? <ChevronRight /> : <ChevronLeft />}
          </IconButton>
        </List>
      </div>
    </div>
  );
}

const CircleWithT = () => (
  <div className="w-9 h-9 bg-black rounded-full flex items-center justify-center">
    <img src="/tradesaga-logo.png" alt="logo" />
  </div>
);