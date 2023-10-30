import { trpc } from "../utils/trpc";
import { User } from "@prisma/client";
import PropTypes from "prop-types";
import React from "react";
import Layout from "../components/layout";
import type { ReactElement } from "react";
import { useEffect, useState } from "react";
import { getSession, signOut } from "../utils/supabase";

export default function Dashboard() {
  const [session, setSession] = useState({});
  const [user, setUser] = useState({});
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // const fetchData = async () => {
    //   const { data, error } = await getSession();
    //   if (error) {
    //     setError(error.message);
    //   }

    //   if (data) {
    //     setSession(data);
    //   }
    // };

    // fetchData()
    //   .catch(console.error);
    getSession().then(({ data: { session }, error }) => {
      console.log("GET SESSION");
      console.log(`session: ${session}`);
      console.log(`error: ${error}`);
      if (error) {
        setError(error.message);
      }
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
      console.log("SUCCESSFUL LOGOUT");
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

  return (<div>
    <p>{session && JSON.stringify(session)}</p>
    <p>{user && JSON.stringify(user)}</p>
    This is the dashboard.
    <button onClick={handleSignOut}>Sign Out</button>
    <p>{error && error}</p>
  </div>);
}

Dashboard.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
