import { useState } from "react";
import {trpc} from "../utils/trpc";
import { signIn, signInWithOAuth, resetPasswordForEmail } from "../utils/supabase";
import { Google, GitHub, Visibility, VisibilityOff } from "@mui/icons-material";
import { TextField, Button, IconButton, FormControl, InputLabel, Input, InputAdornment, Link, Box, Typography, Paper } from "@mui/material";


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
      window.location.href = "/home";
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

  return (
    <Box className="h-screen flex justify-center items-center" style={{ backgroundImage: `url(/trading-bk.png)`, backgroundSize: 'cover' }}>
      <Paper elevation={3} className="flex flex-col items-center p-10 rounded-lg w-[500px]" style={{ minWidth: '400px' }}>
        <Typography variant="h4" className="mb-5 font-bold">Login</Typography>
        <form className="w-full" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Email"
            variant="outlined"
            className="mb-4"
            onChange={handleEmailChange}
            placeholder="Enter your email"
          />
          <FormControl fullWidth variant="outlined" className="mb-4">
            <InputLabel htmlFor="password">Password</InputLabel>
            <Input
              id="password"
              type={showPassword ? 'text' : 'password'}
              onChange={handlePasswordChange}
              placeholder="Enter your password"
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
          <Link href="#" onClick={() => resetPasswordForEmail(email)} className="text-blue-500 mb-4">Forgot Password?</Link>
          <Button type="submit" variant="contained" color="primary" className="rounded-lg mb-4 w-full bg-blue-500">Submit</Button>
          {error && <Typography color="error">{error}</Typography>}
          <div className="flex items-center my-4">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="flex-shrink mx-4 text-gray-500">or</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>
          <Button onClick={() => handleOAuthSignIn('google')} variant="outlined" startIcon={<Google />} className="mb-4 w-full bg">
            Continue with Google
          </Button>
          <Button onClick={() => handleOAuthSignIn('github')} variant="outlined" sx={{color:'black'}} startIcon={<GitHub />} className="w-full ">
            Continue with GitHub
          </Button>
        </form>
        <Typography className="mt-4">
          Not a user? <Link href="/registration" className="text-blue-500">Signup</Link>
        </Typography>
      </Paper>
    </Box>
  );
}