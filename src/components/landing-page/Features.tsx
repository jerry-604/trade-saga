
import React from 'react';
import FeatureCard from './FeatureCard';
import RealtimeIcon from '@mui/icons-material/AccessTime'; // Replace with actual icons
import ViewInArIcon from '@mui/icons-material/ViewInAr';
import LeaderboardIcon from '@mui/icons-material/Leaderboard'; // Replace with actual icons
import { motion } from 'framer-motion';


const FeaturesSection: React.FC = () => {
  return (
    <div className=" py-12 bg-slate-400">
      <div className="container mx-auto px-6 md:px-12">
        <h2 className="text-3xl font-bold text-center">Key Features</h2>
        <div className="flex flex-wrap items-center justify-center mt-6">
          <FeatureCard
            title="Real-time Market Data"
            description="Trade with up-to-the-minute market data for the most authentic experience."
            Icon={RealtimeIcon}
            image="/real-time.jpeg" // Replace with actual image path
          />
          <FeatureCard
            title="Virtual Trading Experience"
            description="Hone your skills in a safe environment before hitting the real markets."
            Icon={ViewInArIcon}
            image="/virtual-trading.jpg" // Replace with actual image path
          />
          <FeatureCard
            title="Competitive Leaderboard"
            description="Challenge and learn from peers, elevate your trading to new heights."
            Icon={LeaderboardIcon}
            image="/leaderboard.jpeg" // Replace with actual image path
          />
          {/* Add more FeatureCards as needed */}
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;
