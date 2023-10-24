import { trpc } from "../utils/trpc";
import { useState } from "react";

export default function Registration() {
  const [name, setName] = useState('');
  const [Fname, setFname] = useState('');
  const [Lname, setLname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const mutation = trpc.userRouter.createUser.useMutation();

  const testHandler = () => {
    const name = 'Romulus' + Math.floor(Math.random() * 100000);
    const Fname = 'Rom';
    const Lname = 'Ulus';
    // const email = `rom${Math.floor(Math.random() * 100000)}@rom.rom`;
    const email = "chamuelchandler12@gmail.com";
    const password = 'testpassword';
    const result = mutation.mutate({ name, Fname, Lname, email, password });
    console.log(result);
  };

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

  return <div>
    <p>This will be the registration page</p>
    <form>
      <input onChange={handleEmailChange} type="text" placeholder="Email"></input>
      <input onChange={handleNameChange} type="text" placeholder="Username"></input>
      <input onChange={handleFnameChange} type="text" placeholder="First Name"></input>
      <input onChange={handleLnameChange} type="text" placeholder="Last Name"></input>
      <input onChange={handlePasswordChange} type="password" placeholder="password"></input>
      <input onChange={handleConfirmPasswordChange} type="password" placeholder="password"></input>
      <button onClick={testHandler} type="submit">Submit</button>
    </form>
  </div>;
}