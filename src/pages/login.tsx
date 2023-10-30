import { useState } from "react";
import { trpc } from "../utils/trpc";
import { signIn } from "../utils/supabase";

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

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

  return <div>
    <p>This will be the login page</p>
    <form onSubmit={handleSubmit}>
      <input onChange={handleEmailChange} type="email"></input>
      <input onChange={handlePasswordChange} type="password"></input>
      <button type='submit'>Submit</button>
      {error && <p>{error}</p>}
    </form>
  </div>;
}