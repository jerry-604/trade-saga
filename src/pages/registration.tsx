import { trpc } from "../utils/trpc";
import { useState } from "react";
import Image from "next/image";
import { signIn } from "../utils/supabase";
import { signInWithOAuth } from "../utils/supabase";
import { BsGoogle, BsGithub } from "react-icons/bs";
import { TextField, Button, Box, Typography, Paper, Link } from "@mui/material";
// import BackgroundImage from '../path-to-your-background-image.jpg'; // Update this path

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
          window.location.href = "/home";
        },
        onError: (error) => {
          setError(error.message);
        },
      });
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

  return (
    <Box className="h-screen flex justify-center items-center" style={{ backgroundImage: `url(/trading-bk.png)`, backgroundSize: 'cover', }}>
      <Paper elevation={3} className="flex flex-col items-center p-10 rounded-lg  w-[500px]" style={{ minWidth: '400px' }}>
        <Typography variant="h4" className="mb-5 font-bold">Create Your Account</Typography>
        <form className="w-full" onSubmit={handleSubmit}>
          <TextField fullWidth label="First Name" variant="outlined" className="mb-4" onChange={handleFnameChange} placeholder="First Name" />
          <TextField fullWidth label="Last Name" variant="outlined" className="mb-4" onChange={handleLnameChange} placeholder="Last Name" />
          <TextField fullWidth label="Email" variant="outlined" className="mb-4" onChange={handleEmailChange} placeholder="Email" />
          <TextField fullWidth label="Password" variant="outlined" className="mb-4" type="password" onChange={handlePasswordChange} placeholder="Password" />
          <TextField fullWidth label="Confirm Password" variant="outlined" className="mb-4" type="password" onChange={handleConfirmPasswordChange} placeholder="Confirm Password" />
          <Button type="submit" variant="contained" color="primary" className="rounded-lg mb-4 w-full bg-blue-500">Submit</Button>
          {error && <Typography color="error" className="mb-4">{error}</Typography>}

          <div className="flex items-center my-4">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="flex-shrink mx-4 text-gray-500">or</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>

          <Button onClick={() => handleOAuthSignIn('google')} variant="outlined" startIcon={<BsGoogle />} className="mb-4 w-full">
            Continue with Google
          </Button>
          <Button onClick={() => handleOAuthSignIn('github')} sx={{color:"black"}} variant="outlined" startIcon={<BsGithub />} className="w-full">
            Continue with GitHub
          </Button>
        </form>
        <Typography className="mt-4">
          Already a user? <Link href="/login" className="text-blue-500">Login</Link>
        </Typography>
      </Paper>
    </Box>
  );
}