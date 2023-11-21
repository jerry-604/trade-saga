import React, { useState, useEffect } from 'react';
import { IconButton, InputBase, Badge, Avatar } from '@mui/material';
import { Search, Notifications, AccountCircle } from '@mui/icons-material';
import ProfileModal from './profileModal';
import NotificationModal from './notificationModal';

interface HeaderProps {
    onSymbolChange: (symbol: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onSymbolChange }) => {
  const [searchValue, setSearchValue] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [profileModalOpen, setProfileModalOpen] = useState(false);

  const toggleProfileModal = () => {
    setProfileModalOpen(!profileModalOpen);
  };
  const [notificationModalOpen, setNotificationModalOpen] = useState(false);

  const toggleNotificationModal = () => {
    setNotificationModalOpen(!notificationModalOpen);
  };

  const sampleProfile = {
    name: "TradeSaga Player",
    username: "player1",
    imageUrl: "https://png.pngtree.com/thumb_back/fh260/background/20230612/pngtree-man-wearing-glasses-is-wearing-colorful-background-image_2905240.jpg" 
  };

  const sampleNotifications = [
    {
      id: '1j8da8h0afldf',
      title: "Opening Bell: Game on! 📈",
      source: "Stock Market Trading Game on TradeSaga",
      timestamp: "Nov 16 at 9:30 AM ET",
      profilePic: "https://png.pngtree.com/thumb_back/fh260/background/20230612/pngtree-man-wearing-glasses-is-wearing-colorful-background-image_2905240.jpg" 
    },
    {
      id: "2nkj8adsadf0fu",
      title: "You started a game! 🎉",
      source: "You started the game 'Tech Stocks Only'",
      timestamp: "Nov 16 at 9:30 AM ET",
      profilePic: "https://png.pngtree.com/thumb_back/fh260/background/20230612/pngtree-man-wearing-glasses-is-wearing-colorful-background-image_2905240.jpg" 
    },{
      id: "2nkj8adsadf0fu",
      title: "You Placed a Trade! 🎉",
      source: "You bought 10 shares of AAPL at $120.00",
      timestamp: "Nov 16 at 9:30 AM ET",
      profilePic: "https://png.pngtree.com/thumb_back/fh260/background/20230612/pngtree-man-wearing-glasses-is-wearing-colorful-background-image_2905240.jpg" 
    },{
      id: "2nkj8adsadf0fu",
      title: "You joined a game! 🎉",
      source: "You joined the game 'Tech Stocks Only'",
      timestamp: "Nov 16 at 9:30 AM ET",
      profilePic: "https://png.pngtree.com/thumb_back/fh260/background/20230612/pngtree-man-wearing-glasses-is-wearing-colorful-background-image_2905240.jpg" 
    },{
      id: "2nkj8adsadf0fu",
      title: "Opening Bell: Game on! 📈",
      source: "Stock Market Trading Game on TradeSaga",
      timestamp: "Nov 16 at 9:30 AM ET",
      profilePic: "https://png.pngtree.com/thumb_back/fh260/background/20230612/pngtree-man-wearing-glasses-is-wearing-colorful-background-image_2905240.jpg" 
    },{
      id: "2nkj8adsadf0fu",
      title: "Opening Bell: Game on! 📈",
      source: "Stock Market Trading Game on TradeSaga",
      timestamp: "Nov 16 at 9:30 AM ET",
      profilePic: "https://png.pngtree.com/thumb_back/fh260/background/20230612/pngtree-man-wearing-glasses-is-wearing-colorful-background-image_2905240.jpg" 
    },
  
  ];
  

  useEffect(() => {
    if (searchValue.length > 0) {
        fetch(`/api/search?query=${searchValue}`)
        .then(response => {
            console.log(response);
            return response.json();  
        })
        .then(data => {
          setSearchResults(data[0].results);  // the assets are always in the first array element
          setShowModal(true);
        })
        .catch(error => {
            console.error(error);
            });  
        }             
    else {
      setShowModal(false);
    }
}, [searchValue]);


  return (
    <div className="flex items-center justify-between p-4 bg-white shadow-md top-0 sticky z-50">
      <div className="relative">
        <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <InputBase
        className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-[400px]"
        placeholder="Search for a stock..."
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        onFocus={() => setIsInputFocused(true)}
        onBlur={() => setIsInputFocused(false)}
        
      />
      {showModal && isInputFocused && (
        <div onMouseDown={(e) => e.preventDefault()}  className="absolute top-full mt-2 w-full bg-white border border-gray-300 rounded-lg shadow-lg z-50">
          {searchResults.map((result) => (
            <div
              key={result.id}
              className="flex items-center p-2 hover:bg-gray-100 z-50"
              onClick={() => 
                {onSymbolChange(result.symbol)
                setShowModal(false); // Hide the modal after selecting
                }
            }
            >
              <img src={result.logo_url} alt={`${result.name} logo`} className="w-8 h-8 mr-2" />
              <div className="flex-grow">
                <div className="font-semibold">{result.name} ({result.symbol})</div>
              </div>
              <div
                className={`rounded-full px-2 ${
                  result.change_direction === 'up' ? 'bg-green-100 text-green-500' : 'bg-red-100 text-red-500'
                }`}
              >
                {result.change_percent}
              </div>
            </div>
          ))}
        </div>
      )}

      </div>
      <div className="flex items-center space-x-2">
        <IconButton color="inherit" onClick={toggleNotificationModal}>
          <Badge badgeContent={5} color="secondary">
            <Notifications />
          </Badge>
        </IconButton>

        <NotificationModal
          open={notificationModalOpen}
          onClose={() => setNotificationModalOpen(false)}
          notifications={sampleNotifications.slice(0, 5)}
        />
        <div className="h-6 w-px bg-gray-400 mx-2"></div>
        <IconButton onClick={toggleProfileModal} color="inherit">
          <Avatar sx={{ bgcolor: 'grey.200' }}>
            <AccountCircle />
          </Avatar>
        </IconButton>
        <span className="ml-2 font-semibold">TradeSaga Player</span>
      </div>

      <ProfileModal 
        open={profileModalOpen} 
        onClose={() => setProfileModalOpen(false)} 
        profile={sampleProfile} 
      />

      </div>
  );
}

export default Header;
