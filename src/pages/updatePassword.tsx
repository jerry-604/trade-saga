import { updatePassword } from "../utils/supabase";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";
import { useState } from "react";

export default function passwordReset() {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showCPassword, setShowCPassword] = useState(false);

  const handleSubmit = async () => {
    if (newPassword !== confirmPassword) {
      setError("passwords don't match");
      return;
    }
    const { data, error } = await updatePassword(newPassword);
    if (error) {
      console.error(error);
      setError(error.message);
    } else {
      console.log("successfully updated password");
      window.location.href = "/";
    }
  };

  const handlePasswordChange = (e: any) => {
    setNewPassword(e.target.value);
  };

  const handleCPasswordChange = (e: any) => {
    setConfirmPassword(e.target.value);
  };

  return (
    <div className="h-screen flex justify-center bg-[#F5F7F9]">
      <div className="flex flex-col items-center place-self-center self-center border border-[#EBEEF3] border-solid rounded py-5 px-10 w-[450px] h-fit bg-white shadow-sm">
        <h1 className="text-xl text-bold border-b border-[#EBEEF3] border-solid px-5 font-bold">Reset Password</h1>
        <div className="w-full">
          <p className="mt-3 font-semibold">New Password:</p>
          <div className="flex">
            <input value={newPassword} className="bg-[#F4F6F8] rounded shadow-inner pl-1 mr-1 w-full" onChange={handlePasswordChange} type={`${showPassword ? "text" : "password"}`}></input>
            {showPassword ? <BsEyeFill size={"25px"} onClick={() => setShowPassword(!showPassword)} /> : <BsEyeSlashFill size={"25px"} onClick={() => setShowPassword(!showPassword)} />}
          </div>
          <p className="mt-3 font-semibold">Confirm Password:</p>
          <div className="flex">
            <input value={confirmPassword} className="bg-[#F4F6F8] rounded shadow-inner pl-1 mr-1 w-full" onChange={handleCPasswordChange} type={`${showCPassword ? "text" : "password"}`}></input>
            {showCPassword ? <BsEyeFill size={"25px"} onClick={() => setShowCPassword(!showCPassword)} /> : <BsEyeSlashFill size={"25px"} onClick={() => setShowCPassword(!showCPassword)} />}
          </div>
          <div className="grid place-items-center">
            <button className="cursor-pointer w-[100px] h-[50px] bg-blue-600 rounded-lg mt-[10px] 
            hover:rounded-lg hover:outline-black hover:outline font-bold text-white mx-auto mt-[20px]" onClick={handleSubmit}>Submit</button>
            {error && <p className="mt-5 bg-red-100 rounded border border-red-200 border-solid w-fit place-self-center px-5">{error}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}