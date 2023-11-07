import { trpc } from "../utils/trpc";
import { useState } from "react";
import Image from "next/image"

export default function Registration() {
  const [name, setName] = useState('');
  const [Fname, setFname] = useState('');
  const [Lname, setLname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const mutation = trpc.userRouter.createUser.useMutation();

  const handleNameChange = (e: any) => {
    setName(e.target.value);
  };
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
        name, Fname, Lname, email, password, confirmPassword
      },
      {
        onSuccess: (data) => {
          window.location.href = "/";
        },
        onError: (error) => {
          setError(error.message);
        },
      });
  };

  return <div className="h-screen relative">
    <Image src="/create-background.png" height={1000} width={1000} alt="text" className="transform absolute top-0 left-0 w-screen h-screen z-0"></Image>
    <div className="z-10 h-full">
      <form onSubmit={handleSubmit}>
      <div className="fixed top-[120px] left-[550px] w-[600px] h-[700px] bg-white
      rounded-tl-lg rounded-tr-lg rounded-bl-lg rounded-br-lg z-15"></div>
      <p className="fixed top-[180px] left-[750px] text-xl bg-black-100 z-20">Create your Account</p>
        <div className="fixed top-[250px] left-[645px] z-20">
          <input onChange={handleNameChange} type="text" placeholder=" Username" 
          className="w-[400px] h-[40px] bg-gray-200"></input>
        </div>
        <div className="fixed top-[320px] left-[645px] z-20">
          <input onChange={handleEmailChange} type="text" placeholder=" Email"
          className="w-[400px] h-[40px] bg-gray-200"></input>
        </div>
        <div className="absolute top-[390px] left-[645px] z-20">
          <input onChange={handleFnameChange} type="text" placeholder=" First Name"
          className="w-[400px] h-[40px] bg-gray-200"></input>
        </div>
        <div className="absolute top-[460px] left-[645px] z-20">
          <input onChange={handleLnameChange} type="text" placeholder=" Last Name"
          className="w-[400px] h-[40px] bg-gray-200"></input>
        </div>
        <div className="absolute top-[530px] left-[645px] z-20">
          <input onChange={handlePasswordChange} type="password" placeholder=" Password"
          className="w-[400px] h-[40px] bg-gray-200"></input>
        </div>
        <div className="absolute top-[600px] left-[645px] z-20">
          <input onChange={handleConfirmPasswordChange} type="password" placeholder=" Password"
          className="w-[400px] h-[40px] bg-gray-200"></input>
        </div>
        <div className="absolute top-[680px] left-[800px] w-[92px] h-[62px] bg-blue-700 rounded-tl-lg rounded-tr-lg rounded-bl-lg rounded-br-lg z-17"></div>
        <div className="absolute top-[700px] left-[820px] z-20">
          <button type="submit">Submit</button>
          {error && <p>Error: {error}</p>}
        </div>
      </form>
    </div>
  </div>;
}