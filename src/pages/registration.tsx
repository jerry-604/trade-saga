import { trpc } from "../utils/trpc";
import { useState } from "react";
import Image from "next/image";
import { signIn } from "../utils/supabase";

export default function Registration() {
  const [Fname, setFname] = useState('');
  const [Lname, setLname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const mutation = trpc.userRouter.createUser.useMutation();

  const handleFnameChange = (e: any) => {
    setFname(e.target.value);
  };
  const handleLnameChange = (e: any) => {
    setLname(e.target.value);
  };
  const handleEmailChange = (e: any) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e: any) => {
    setPassword(e.target.value);
  };
  const handleConfirmPasswordChange = (e: any) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    mutation.mutate(
      {
        Fname, Lname, email, password, confirmPassword
      },
      {
        onSuccess: async (data) => {
          await signIn(email, password);
          window.location.href = "/";
        },
        onError: (error) => {
          setError(error.message);
        },
      });
  };

  return <div className="flex h-screen w-screen relative">
    <Image src="/create-background.png" height={3000} width={3000} alt="text"
      className="transform absolute top-0 left-0 w-screen h-screen"></Image>
    <div className="flex h-full w-full">
      <form onSubmit={handleSubmit}>
        <div className="flex items-center justify-center h-screen w-screen">
          <div className="w-[600px] h-[700px] bg-white rounded-lg z-10">
            <p className="flex justify-center mt-[50px] text-xl font-bold
             text-shadow bg-black-100 z-20">Create your TradeSaga Account</p>
            <div className="flex justify-center mt-[45px] z-20">
              <input onChange={handleEmailChange} type="text" placeholder="Email"
                className="w-[400px] h-[40px] rounded shadow-inner bg-gray-200 pl-[10px]"></input>
            </div>
            <div className="flex justify-center mt-[45px] z-20">
              <input onChange={handleFnameChange} type="text" placeholder="First Name"
                className="w-[400px] h-[40px] rounded shadow-inner bg-gray-200 pl-[10px]"></input>
            </div>
            <div className="flex justify-center mt-[45px] z-20">
              <input onChange={handleLnameChange} type="text" placeholder="Last Name"
                className="w-[400px] h-[40px] rounded shadow-inner bg-gray-200 pl-[10px]"></input>
            </div>
            <div className="flex justify-center mt-[45px] z-20">
              <input onChange={handlePasswordChange} type="password" placeholder="Password"
                className="w-[400px] h-[40px] rounded shadow-inner bg-gray-200 pl-[10px]"></input>
            </div>
            <div className="flex justify-center mt-[45px] z-20">
              <input onChange={handleConfirmPasswordChange} type="password" placeholder="Confirm Password"
                className="w-[400px] h-[40px] rounded shadow-inner bg-gray-200 pl-[10px]"></input>
            </div>
            <div className="flex justify-center mt-[65px] z-20">
              <div className="w-[100px] h-[60px] bg-blue-600 shadow-lg rounded-lg">
                <div className="flex items-center justify-center h-[60px] z-25">
                  <button type="submit" className="flex items-center justify-center h-[60px] w-[100px] z-25
                   font-bold text-white hover:rounded-lg hover:outline-black hover:outline">Submit</button>
                </div>
              </div>
            </div>
            {error && <p className="flex justify-center text-red-600 mt-[20px]">Error: {error}</p>}
          </div>
        </div>
      </form>
    </div>
  </div>;
}