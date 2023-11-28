
import React from 'react';
import { SvgIconProps } from '@mui/material';
import Image from 'next/image';

interface FeatureCardProps {
  title: string;
  description: string;
  Icon: (props: SvgIconProps) => JSX.Element;
  image: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, Icon, image }) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg hover:shadow-2xl transition duration-300 ease-in-out transform m-1 hover:-translate-y-1 bg-white">
      <Image src={image} alt={title} width={400} height={250} className="w-full" />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2 flex items-center">
          <Icon className="text-primary mr-2" /> {title}
        </div>
        <p className="text-gray-700 text-base">
          {description}
        </p>
      </div>
    </div>
  );
};

export default FeatureCard;
