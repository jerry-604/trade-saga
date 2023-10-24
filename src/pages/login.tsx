import { useState } from "react";
import { trpc } from "../utils/trpc";
import { signIn } from "../utils/supabase";

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e: any) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: any) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async () => {
    const { data, error } = await signIn(email, password);
    if (error) {
      console.error('Sign-in error:', error);
    } else {
      console.log('Sign-in successful:', data);
    }
  };

  return <div>
    <p>This will be the login page</p>
    <form>
      <input onChange={handleEmailChange} type="email"></input>
      <input onChange={handlePasswordChange} type="password"></input>
      <button onClick={() => handleSubmit}>Submit</button>
    </form>
  </div>;
}