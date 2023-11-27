import { updatePassword } from "../utils/supabase";
import { useState } from "react";

export default function passwordReset() {
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState('');
  const handleSubmit = async () => {
    const { data, error } = await updatePassword(newPassword);
    if (error) {
      console.error(error);
      setError(error.message);
    } else {
      console.log("successfully updated password");
      // window.location.href = "/";
    }
  };

  const handlePasswordChange = (e: any) => {
    setNewPassword(e.target.value);
  };

  return (
    <div>
      <input value={newPassword} onChange={handlePasswordChange} type="password" placeholder="new password"></input>
      <button onClick={handleSubmit}>submit</button>
      {error && <p>{error}</p>}
    </div>
  );
}