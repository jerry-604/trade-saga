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

  const handleNameChanges = async () => {
    console.log("in handle name changes");
  };

  useEffect(() => {
    setUser(query);
    getSession().then(({ data: { session }, error }) => {
      if (error) {
        setError(error.message);
      }
      setSession(session || {});
      setFname(query.data?.Fname || "");
      setLname(query.data?.Lname || "");
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
          <h2>[Other Settings Go Here Maybe Probably, if not we can redirect]</h2>
        </div>
      </div>
    );
    window.location.href = "/login";
  } else {
    return <div className="flex w-full h-full">
      <div className="flex items-center justify-center h-screen w-screen">
        <div className="w-[500px] h-[700px] bg-white rounded-lg shadow-lg">
          <p className="flex justify-center mt-[25px] text-xl font-bold
            text-shadow bg-black-100">Profile Settings</p>

          {/* @ts-ignore */}
          <Image src={user.data.imageUrl} width={100} height={100} alt="profile picture" 
          className="mx-auto mt-[10px]"/>
      {Fname}
      {Lname}

      {JSON.stringify(user)}
      {/* @ts-ignore */}
      <p>Email: {JSON.stringify(session.user.email)}</p>
      {error && <p>{JSON.stringify(error)}</p>}
      <form onSubmit={handleImageUpload}>
        <h2>Update Profile Picture</h2>

          {/*JSON.stringify(user)*/}
          {/* @ts-ignore */}
          <p className="flex justify-center mt-[10px]">User email: {session.user.email}</p>
          {error && <p className="flex justify-center">{JSON.stringify(error)}</p>}

          <form onSubmit={handleImageUpload}>
            <h2 className="flex justify-center underline mt-[10px]">Update Profile Picture</h2>

          <div className="flex justify-center mt-[10px]">
            <input
              onChange={handleImageChange}
              accept=".jpg, .png, .jpeg"
              type="file"
            ></input>
          </div>

          <div className="flex justify-center">
            <input className="cursor-pointer w-[100px] h-[50px] bg-blue-600 rounded-lg mt-[10px] 
            hover:rounded-lg hover:outline-black hover:outline font-bold text-white" type="submit" value="Upload" />
          </div>
          </form>

          <p className="flex justify-center mt-[20px] underline">Update Name</p>
          <div className="flex justify-center mt-[10px]">
            <input onChange={handleFNameChange} value={Fname} placeholder="First name"
            className="rounded shadow-inner bg-gray-200 pl-[10px] mr-[20px]"></input>
            <input onChange={handleLNameChange} value={Lname} placeholder="Last name"
            className="rounded shadow-inner bg-gray-200 pl-[10px]"></input>
          </div>
          <div className="flex justify-center mt-[10px]">
            <button onClick={handleNameChanges}
            className="cursor-pointer w-[160px] h-[50px] bg-blue-600 rounded-lg mt-[10px] 
            hover:rounded-lg hover:outline-black hover:outline font-bold text-white">Submit Changes</button>
          </div>
        </div>
      </div>
    </div>;
  }

}