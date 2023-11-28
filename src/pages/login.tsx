import { useState } from "react";
import { trpc } from "../utils/trpc";
import { signIn, signInWithOAuth, resetPasswordForEmail } from "../utils/supabase";
import { BsGoogle, BsEyeFill, BsEyeSlashFill, BsEye, BsEyeSlash, BsGithub } from "react-icons/bs";

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleEmailChange = (e: any) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: any) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const { data, error } = await signIn(email, password);
    if (error) {
      setError(error.message);
      console.error('Sign-in error:', error);
    } else {
      console.log('Sign-in successful:', data);
      window.location.href = "/dashboard";
    }
  };

  const handleOAuthSignIn = async (provider: 'google' | 'github') => {
    const { data, error } = await signInWithOAuth(provider);
    if (error) {
      setError(error.message);
      console.error('Sign-in error:', error);
    } else {
      console.log('Sign-in successful:', data);
    }
  };

  return <div className="h-screen flex justify-center bg-[#F5F7F9]">
    <div className="flex flex-col items-center place-self-center self-center border border-[#EBEEF3] border-solid rounded py-5 px-10 w-[450px] h-[500px] bg-white shadow-sm">
      <h1 className="text-xl text-bold border-b border-[#EBEEF3] border-solid px-5 font-bold">Login</h1>
      <form className="flex flex-col w-full" onSubmit={handleSubmit}>
        <p className="mt-5 font-semibold">Email:</p>
        <input className="bg-[#F4F6F8] rounded shadow-inner pl-1" onChange={handleEmailChange} type="email"></input>
        <p className="mt-3 font-semibold">Password:</p>
        <div className="flex">
          <input className="bg-[#F4F6F8] rounded shadow-inner pl-1 mr-1 w-full" onChange={handlePasswordChange} type={`${showPassword ? "text" : "password"}`}></input>
          {showPassword ? <BsEyeFill size={"25px"} onClick={() => setShowPassword(!showPassword)} /> : <BsEyeSlashFill size={"25px"} onClick={() => setShowPassword(!showPassword)} />}
        </div>
        <p className="mt-1 cursor-pointer" onClick={() => resetPasswordForEmail(email)}>Forgot Password?</p>
        <button className="cursor-pointer w-[100px] h-[50px] bg-blue-600 rounded-lg mt-[10px] 
            hover:rounded-lg hover:outline-black hover:outline font-bold text-white mx-auto" type='submit'>Submit</button>
        {error && <p className="mt-5 bg-red-100 rounded border border-red-200 border-solid w-fit place-self-center px-5">{error}</p>}
        <div className="flex flex-row mt-5 place-items-center">
          <div className="border-t border-[#EBEEF3] border-solid w-full" />
          <p className="w-fit mx-1 text-[#EBEEF3]">or</p>
          <div className="border-t border-[#EBEEF3] border-solid w-full" />
        </div>
        <div className="flex flex-col mt-5 items-center">
          <div className="flex items-center bg-[#F4F6F8] rounded border border-[#EBEEF3] border-solid w-fit px-5 cursor-pointer active:shadow-inner py-1" onClick={() => handleOAuthSignIn('google')}>
            <BsGoogle size={"30px"} color={"white"} style={{ stroke: "black", strokeWidth: "0.1" }} />
            <p className="mx-2">Login with Google</p>
          </div>
          <div className="flex items-center mt-5 bg-[#F4F6F8] rounded border border-[#EBEEF3] border-solid w-fit px-5 cursor-pointer active:shadow-inner py-1" onClick={() => handleOAuthSignIn('github')}>
            <BsGithub size={"30px"} color="white" style={{ stroke: "black", strokeWidth: "0.1" }} />
            <p className="mx-2">Login with GitHub</p>
          </div>
        </div>
      </form>
    </div>

  </div>;
}