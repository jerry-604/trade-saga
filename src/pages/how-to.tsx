import Layout from '../components/layout';
import React, { ReactElement, useState, useEffect} from 'react';

export default function HowTo() {
  return (
    <div className={`bg-[url('/game-background-1.png')] bg-cover bg-no-repeat bg-left h-[260px] p-5 pl-[30px] border-b-[2px] border-[#CDCDCD]`}>
      <div className="flex w-full h-full justify-center items-center">
      <h1 className="text-[55px] font-semibold">
          How To Play
        </h1>
      </div>
    </div>
  );
}

HowTo.getLayout = function getLayout(page: ReactElement) {
    return <Layout>{page}</Layout>;
  };
  