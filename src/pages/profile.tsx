import { useEffect, useState } from "react";
import { getSession, signOut, uploadAvatar } from "../utils/supabase";
import Link from 'next/link';
import Image from "next/image";

import { trpc } from "../utils/trpc";
import withAuth from "../utils/with-auth";

export default function Profile() {

  const [session, setSession] = useState({});
  const [loading, setLoading] = useState(true);
  const [image, setImage] = useState();
  const [Fname, setFname] = useState("");
  const [Lname, setLname] = useState("");
  const [error, setError] = useState("");
  const mutation = trpc.userRouter.uploadImage.useMutation();
  const nameMutation = trpc.userRouter.updateUserName.useMutation();
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

  const truncateFileName = (fileName: string, maxLength: number) => {
    if (fileName.length > maxLength) {
      return fileName.substring(0, maxLength - 3) + '...';
    }
    return fileName;
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
    nameMutation.mutate({
      FnameEdit: Fname, LnameEdit: Lname
    },
      {
        onSuccess: (data) => {
          console.log(data);
          window.location.href = "/profile";
        },
        onError: (error) => {
          console.error(error);
          setError(error.message);
        }
      });
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
      <div className="flex w-full h-full">
        <div className="flex justify-center items-center h-screen w-screen">
          <div className="w-[400px] h-[200px] bg-white rounded-lg shadow-lg">

            <p className="flex justify-center mt-[40px] font-bold">Please log in to see profile settings</p>
            
            <div className="flex justify-center h-[50px] w-[200px] bg-blue-600 mt-[30px] mx-auto
            font-bold text-white rounded-lg hover:rounded-lg hover:outline-black hover:outline">
              <button onClick={() => window.location.href = "/login"}>Click here to login</button>
            </div>

          </div>
        </div>
      </div>
    );
    
  } else {
    return <div className="flex w-full h-full">
      <div className="flex items-center justify-center h-screen w-screen">
        <div className="w-[500px] h-[700px] bg-white rounded-lg shadow-lg">

          <p className="flex justify-center mt-[25px] text-xl font-bold
            text-shadow bg-black-100">Profile Settings Page</p>

          // @ts-ignore
          <Image src={user.data.imageUrl} width={100} height={100} alt="profile picture" 
          className="mx-auto mt-[10px]"/>
          
          // @ts-ignore
          <p className="flex justify-center mt-[10px] mb-[10px]">User email: {session.user.email}</p>

          <div className="border-b border-[#EBEEF3] border-solid"></div>

          <form onSubmit={handleImageUpload}>
            <h2 className="flex justify-center underline mt-[10px]">Update Profile Picture</h2>

            <div className="flex justify-center mt-[10px]">
              <label className="flex justify-center items-center cursor-pointer bg-blue-600 font-bold
               text-white rounded-lg h-[50px] w-[120px] hover:bg-blue-600 mb-[10px]
               hover:rounded-lg hover:outline-black hover:outline">
                Choose File
                <input
                  onChange={handleImageChange}
                  accept=".jpg, .png, .jpeg"
                  type="file"
                  className="opacity-0 absolute inset-0 w-[50px] h-[120px] cursor-pointer"
                ></input>
              </label>
            </div>

            <div>
              <p className="flex justify-center">
                Selected File: 
                <span className="overflow-hidden max-w-[230px]">
                  
                  // @ts-ignore
                  {image ? truncateFileName(image.name, 20) : 'None'}
                </span>
              </p>
            </div>

            <div className="flex justify-center">
              <input className="cursor-pointer w-[100px] h-[50px] bg-blue-600 rounded-lg mt-[10px] mb-[20px]
              hover:rounded-lg hover:outline-black hover:outline font-bold text-white" type="submit" value="Upload" />
            </div>
          </form>
          
          <div className="border-b border-[#EBEEF3] border-solid"></div>

          <p className="flex justify-center mt-[10px] underline">Update Name</p>
          <div className="flex justify-center mt-[10px]">
            <input onChange={handleFNameChange} value={Fname} placeholder="First name"
            className="rounded shadow-inner bg-gray-200 pl-[10px] mr-[20px]"></input>
            <input onChange={handleLNameChange} value={Lname} placeholder="Last name"
            className="rounded shadow-inner bg-gray-200 pl-[10px]"></input>
          </div>
          <div className="flex justify-center mt-[10px]">
            <button onClick={handleNameChanges}
            className="cursor-pointer w-[160px] h-[50px] bg-blue-600 rounded-lg mt-[10px] 
            hover:rounded-lg hover:outline-black hover:outline font-bold text-white mb-[20px]">Submit Changes</button>
          </div>

          <div className="border-b border-[#EBEEF3] border-solid"></div>

          <p className="flex justify-center mt-[10px] underline">Update Password</p>          
          <div className="flex justify-center">
            <Link href="/updatePassword">
              <p className="flex justify-center items-center cursor-pointer
                w-[280px] h-[50px] bg-blue-600
                rounded-lg mt-[10px] hover:rounded-lg hover:outline-black
                hover:outline font-bold text-white">
                Click here to update Password
              </p>
            </Link>
          </div>

          {error && <p className="flex justify-center text-red-700 mt-[10px]">{error}</p>}

        </div>
      </div>
    </div>;
  }

}

export const getServerSideProps = withAuth({
  redirectTo: "/"
})
