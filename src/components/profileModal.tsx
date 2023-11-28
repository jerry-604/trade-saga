import React from 'react';
import { List, ListItem, ListItemText, Avatar, ListItemIcon } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import HelpIcon from '@mui/icons-material/Help';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useRouter } from 'next/router';

const ProfileModal = ({ open, onClose, profile, signOut, user }) => {
  const router = useRouter();

  if (!open) return null;

  const handleNavigation = (path) => {
    router.push(path);
    onClose();
  };

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={onClose}></div>
      <div className="absolute top-full right-1 mt-2 w-60 bg-white rounded-md shadow-lg z-50">
        <div className="flex flex-col items-center p-4 border-b bg-slate-600 rounded-md">
          <Avatar src={user?.imageUrl} alt={profile.name} />
          <p className="mt-2 font-bold">{user?.Fname ?? ""} {user?.Lname ?? ""}</p>
          <p className="text-sm text-gray-500">@{user?.email.replace("@gmail.com","") ?? ""}</p>
        </div>
        <List component="nav" aria-label="profile options">
          <ListItem button onClick={() => handleNavigation('/profile')}>
            <ListItemIcon><PersonIcon /></ListItemIcon>
            <ListItemText primary="Profile" />
          </ListItem>
          <ListItem button onClick={() => handleNavigation('/account')}>
            <ListItemIcon><SettingsIcon /></ListItemIcon>
            <ListItemText primary="Account Setting" />
          </ListItem>
          <ListItem button onClick={() => handleNavigation('/help')}>
            <ListItemIcon><HelpIcon /></ListItemIcon>
            <ListItemText primary="Help Center" />
          </ListItem>
          <ListItem button onClick={() => signOut()}>
            <ListItemIcon><ExitToAppIcon /></ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItem>
        </List>
      </div>
    </>
  );
};

export default ProfileModal;
