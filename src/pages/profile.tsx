import { useEffect, useState } from "react";
import { getSession, signOut, uploadAvatar } from "../utils/supabase";

import { trpc } from "../utils/trpc";

export default function Profile() {

  const [session, setSession] = useState({});
  const [loading, setLoading] = useState(true);
  const [image, setImage] = useState();
  const [error, setError] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log("In handle submit");

    if (!image) {
      return;
    }

    const { data, error } = await uploadAvatar(image);
    if (error) {
      setError(error.toString);
      console.error('Upload error:', error);
    } else {
      console.log('Upload successful:', data);
      // window.location.href = "/dashboard";
    }
  };

  const handleChange = (event: any) => {
    setImage(event.target.files[0]);
  };

  useEffect(() => {
    getSession().then(({ data: { session }, error }) => {
      if (error) {
        setError(error.message);
      }
      setSession(session || {});
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <div>
      <h1>...loading</h1>
    </div>;
  }

  if (Object.keys(session).length === 0) {
    window.location.href = "/login";
  } else {
    return <div>
      <h1>Profile Settings</h1>
      {/* @ts-ignore */}
      {JSON.stringify(session.user.email)}
      {error && <p>{JSON.stringify(error)}</p>}
      <form onSubmit={handleSubmit}>
        <h1>Upload Image</h1>

        <input
          onChange={handleChange}
          accept=".jpg, .png, .gif, .jpeg"
          type="file"
        ></input>

        <input className="cursor-pointer" type="submit" value="Upload" />
      </form>
    </div>;
  }

}