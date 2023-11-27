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
  const [session, setSession] = useState({});
  const [user, setUser] = useState({});
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const mutation = trpc.userRouter.validateOAuthUser.useMutation();

  useEffect(() => {
    getSession().then(({ data: { session }, error }) => {
      if (error) {
        setError(error.message);
      }
      console.log(session);
      mutation.mutate(session?.user.email || "", {
        onSuccess: (data) => {
          console.log(`ValidateOAuthUserSucces: ${data}`);
        },
        onError: (error) => {
          console.error(error);
        }
      });
      setSession(session || {});
      setUser(session?.user || {});
      setLoading(false);
    });
  }, []);

  const handleSignOut = async () => {
    const { error } = await signOut();

    if (error) {
      setError(error.message);
    } else {
      window.location.href = "/dashboard";
    }
  };

  if (loading) {
    return (
      <div>
        <p>...loading</p>
      </div>
    );
  }

  return (
    <div>
      This is the dashboard

    </div>
  );
}

Dashboard.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
