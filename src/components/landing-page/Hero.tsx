import React from 'react';
import Button from '@mui/material/Button';
import Header from './Header';

interface HeroSectionProps {
  title: string;
  subtitle: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({ title, subtitle }) => {
  return (
      <div className="relative h-screen overflow-hidden flex items-center justify-center">
      <video autoPlay loop muted className="absolute top-0 left-0 w-full h-full object-cover z-0">
        <source src="/trading-video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
        <Header/>

      <div className="absolute inset-0 bg-black opacity-50 z-10"></div>

      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="flex justify-center items-center h-full z-10">
        <div className="text-center text-white mr-auto">
          <h1 className="text-5xl font-bold">{title}</h1>
          <p className="text-xl my-4">{subtitle}</p>
          <Button style={{textTransform:'none'}} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full text-xl transition duration-300 ease-in-out  mt-8">
            Start Your Journey
          </Button>
        </div>
        <div className="w-1/2">
          <img src="/hero-image.png" alt="Hero" className="rounded-xl shadow-lg" />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
