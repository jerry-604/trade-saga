import React from 'react';
import { List, ListItem, ListItemText, Avatar, Typography, Divider } from '@mui/material';
import { useRouter } from 'next/router';
import { textAlign } from '@mui/system';
import { LoadingBoundary } from './loading-boundary';
import { trpc } from "../utils/trpc";
import { NotificationType } from '@prisma/client';
import { getPostFormattedDate } from '../utils/game-helpers';
const NotificationModal = ({ open, onClose, notifications }) => {
  const router = useRouter();

  if (!open) return null;

  const handleNotificationClick = (notification) => {

    onClose();
    router.push(`/notification/${notification.id}`);
  };

  const viewAllNotifications = () => {
    router.push('/notifications');
    onClose();
  };

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={onClose}></div>
      <div 
        className="absolute top-full mt-2 w-auto bg-white rounded-md shadow-lg z-50 max-h-[500px] overflow-y-auto right-60"
        onClick={(e) => e.stopPropagation()}
      >
        <Typography variant="subtitle1" align="center" className="pt-3 font-bold">
          Notifications
        </Typography>
        <Divider />
        <List component="nav" aria-label="notifications">
           {notifications.map((notification, idx) => (
            <ListItem button key={idx} className="flex items-center" onClick={() => handleNotificationClick(notification)}>
              <Avatar src={notification.user.imageUrl} alt={notification.user.imageUrl} className="mr-3" />
              {
                notification.type == NotificationType.TRADE_PLACED ? (
                  <ListItemText 
                  primary={"You Placed a Trade! 🎉"}
                  secondary={
                    <>
                      <span>{`You bought ${notification.num_shares_purchased} shares of ${notification.symbol} at $${notification.price}`}</span><br />
                      <span className="text-xs text-gray-500">{getPostFormattedDate(notification.createdAt)}</span>
                    </>
                  }
                />
                ) : notification.type == NotificationType.GAME_CREATED ? (
                  <ListItemText 
                  primary={"You started a game! 🎉"}
                  secondary={
                    <>
                      <span>{`You started the game '${notification.game?.name ?? ""}'`}</span><br />
                      <span className="text-xs text-gray-500">{getPostFormattedDate(notification.createdAt)}</span>
                    </>
                  }
                />
                ) : (
                  <ListItemText 
                  primary={"You joined a game! 🎉"}
                  secondary={
                    <>
                      <span>{`You joined the game '${notification.game?.name ?? ""}'`}</span><br />
                      <span className="text-xs text-gray-500">{getPostFormattedDate(notification.createdAt)}</span>
                    </>
                  }
                />
                )
              }
            </ListItem>
          ))}
        </List>
        <Divider />
        <ListItem button className="justify-center" onClick={viewAllNotifications}>
        <ListItemText 
            sx={{ 
                textAlign: "center", 
                color: "blue" 
            }} 
            primary="View All Notifications" 
        />

        </ListItem>
      </div>
    </>
  );
};

export default NotificationModal;
