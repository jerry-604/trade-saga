

import React from 'react';
import Image from 'next/image';

const AboutSection: React.FC = () => {
  return (
    <div id='about' className="bg-white py-12">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-wrap items-center">
          <div className="w-full md:w-1/2 px-6">
            <h2 className="text-3xl font-semibold">Your Gateway to Financial Literacy</h2>
            <p className="mt-4 text-gray-600">
              TradeSaga, crafted by a team of expert software engineers, is a cross-platform web application that simulates a realistic stock market environment. Dive into the world of trading with virtual money and zero risks.
            </p>
            <p className="mt-4 text-gray-600">
              Aimed at enhancing financial literacy, TradeSaga offers real-time synchronization with actual stock market data to ensure a realistic trading experience. Whether you're a beginner or a seasoned trader, TradeSaga is the perfect platform to refine your trading skills.
            </p>
          </div>
          <div className="w-full md:w-1/2 px-6 mt-6 md:mt-0">
            <Image 
              src="/trading.svg" 
              alt="About TradeSaga"
              width={500}
              height={300}
              layout="responsive"
            //   className="rounded-lg shadow-md"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
