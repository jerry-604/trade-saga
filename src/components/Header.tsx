import React, { useState, useEffect } from 'react';
import { IconButton, InputBase, Badge, Avatar } from '@mui/material';
import { Search, Notifications, AccountCircle } from '@mui/icons-material';

interface HeaderProps {
    onSymbolChange: (symbol: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onSymbolChange }) => {
  const [searchValue, setSearchValue] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);

  useEffect(() => {
    if (searchValue.length > 0) {
        fetch(`/api/search?query=${searchValue}`)
        .then(response => {
            console.log(response);
            return response.json();  // Convert the response to JSON
        })
        .then(data => {
          setSearchResults(data[0].results);  // Assuming the assets are always in the first array element
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
    <div className="flex items-center justify-between p-4 bg-white shadow-md top-0 sticky">
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
        <div onMouseDown={(e) => e.preventDefault()}  className="absolute top-full mt-2 w-full bg-white border border-gray-300 rounded-lg shadow-lg z-[9999999999999999999999999999999999]">
          {searchResults.map((result) => (
            <div
              key={result.id}
              className="flex items-center p-2 hover:bg-gray-100 z-[9999999999999999999999999999999999]"
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
        <IconButton color="inherit">
          <Badge badgeContent={5} color="secondary">
            <Notifications />
          </Badge>
        </IconButton>
        <div className="h-6 w-px bg-gray-400 mx-2"></div>
        <Avatar sx={{ bgcolor: 'grey.200' }}>
          <AccountCircle />
        </Avatar>
        <span className="ml-2 font-semibold">TradeSaga Player</span>
      </div>
    </div>
  );
}

export default Header;
