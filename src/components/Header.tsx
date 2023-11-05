import { IconButton, InputBase, Badge, Avatar } from '@mui/material';
import { Search, Notifications, AccountCircle } from '@mui/icons-material';

interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
  return (
    <div className="flex items-center justify-between p-4 bg-white shadow-md">
      <div className="relative">
        <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <InputBase
          className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg"
          placeholder="Search for a stock..."
        />
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