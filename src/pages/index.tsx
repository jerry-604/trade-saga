import { trpc } from "../utils/trpc";
import { User } from "@prisma/client";
import PropTypes from "prop-types";
import React from "react";
import Layout from "../components/layout";
import type { ReactElement } from "react";
import { useEffect, useState } from "react";
import { getSession, signOut } from "../utils/supabase";
import HeroSection from "../components/landing-page/Hero";
import AboutSection from "../components/landing-page/About";
import FeaturesSection from "../components/landing-page/Features";
import Footer from "../components/landing-page/Footer";
import StockSlider from "../components/landing-page/StockSlider";
import Header from "../components/landing-page/Header";

export default function Dashboard() {

  const user = trpc.userRouter.getUserFromContext.useQuery().data;

  return (
    <div>
      {/* <Header/> */}
       <HeroSection
        title="Experience the Thrill of the Stock Market, Risk-Free"
        subtitle="Join TradeSaga and dive into the world of virtual stock trading."
        user={user}
      />
      <AboutSection/>
      <FeaturesSection/>
      <StockSlider user={user}/>
      <Footer/>

    </div>
  );
}

Dashboard.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
