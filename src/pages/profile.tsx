import { useEffect, useState } from "react";
import { getSession, signOut, uploadAvatar } from "../utils/supabase";
import Image from "next/image";

import { trpc } from "../utils/trpc";

export default function Profile() {

  const [session, setSession] = useState({});
  const [loading, setLoading] = useState(true);
  const [image, setImage] = useState();
  const [Fname, setFname] = useState("");
  const [Lname, setLname] = useState("");
  const [error, setError] = useState("");
  const mutation = trpc.userRouter.uploadImage.useMutation();
  const query = trpc.userRouter.getUser.useQuery();
  const [user, setUser] = useState({});

  const handleImageUpload = async (e: any) => {
    e.preventDefault();

    if (!image) {
      return;
    }

    try {
      const data = await uploadAvatar(image);
      if (data.error) {
        setError(data.error.toString);
        console.error('Upload error:', data.error.toString);
      } else {
        console.log('Upload successful:', data);
        mutation.mutate(
          {
            // @ts-ignore
            imageUrl: data.data.signedUrl
          },
          {
            onSuccess: (data) => {
              window.location.href = "/dashboard";
            },
            onError: (error) => {
              setError(error.message);
            },
          });
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleImageChange = (event: any) => {
    setImage(event.target.files[0]);
  };

  const handleFNameChange = (e: any) => {
    setFname(e.target.value);
  };
  const handleLNameChange = (e: any) => {
    setLname(e.target.value);
  };

  useEffect(() => {
    setUser(query);
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
    return (
      <div>
        <p>Please log in to see profile settings</p>
        <button onClick={() => window.location.href = "/login"}>Login</button>

        <div>
          <h2>[Other Settings Go Here Maybe Probably]</h2>
        </div>
      </div>
    );
    window.location.href = "/login";
  } else {
    return <div>
      <h1>Profile Settings</h1>
      {/* @ts-ignore */}
      <Image src={user.data.imageUrl} width={100} height={100} alt="profile picture" />

      {JSON.stringify(user)}
      {/* @ts-ignore */}
      <p>Email: {JSON.stringify(session.user.email)}</p>
      {error && <p>{JSON.stringify(error)}</p>}
      <form onSubmit={handleImageUpload}>
        <h2>Update Profile Picture</h2>

        <input
          onChange={handleImageChange}
          accept=".jpg, .png, .jpeg"
          type="file"
        ></input>

        <input className="cursor-pointer" type="submit" value="Upload" />
      </form>

      <div>
        <input onChange={handleFNameChange} value={Fname} placeholder="first name"></input>
        <input onChange={handleLNameChange} value={Lname} placeholder="last name"></input>
      </div>
    </div>;
  }

}