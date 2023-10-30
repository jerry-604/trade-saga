import { trpc } from "../utils/trpc";
import { useState } from "react";

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

  return <div>
    <p>This will be the registration page</p>
    <form onSubmit={handleSubmit}>
      <input onChange={handleNameChange} type="text" placeholder="Username"></input>
      <input onChange={handleEmailChange} type="text" placeholder="Email"></input>
      <input onChange={handleFnameChange} type="text" placeholder="First Name"></input>
      <input onChange={handleLnameChange} type="text" placeholder="Last Name"></input>
      <input onChange={handlePasswordChange} type="password" placeholder="password"></input>
      <input onChange={handleConfirmPasswordChange} type="password" placeholder="password"></input>
      <button type="submit">Submit</button>
      {error && <p>Error: {error}</p>}
    </form>
  </div>;
}