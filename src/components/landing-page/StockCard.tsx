
import React from 'react';
import Image from 'next/image';
import Avatar from '@mui/material/Avatar';

interface StockCardProps {
  symbol: string;
  name: string;
  image: string;
  graph: string;
}

const StockCard: React.FC<StockCardProps> = ({ symbol, name, image, graph }) => {
  return (
    <div className="flex flex-col items-center px-8 py-4 rounded overflow-hidden shadow-lg bg-white mx-2 w-auto">
      {/* <Image src={image} alt={`${name} logo`} width={50} height={50} /> */}
      <Avatar className="p-1" src={image} alt={name}>{name[1]}</Avatar>
      <p className="text-sm font-semibold mt-2">{symbol}</p>
      <p className="text-lg font-semibold">{name}</p>
      <Image src={graph} alt={`Price change graph for ${name}`} width={100} height={50} />
    </div>
  );
};

export default StockCard;
