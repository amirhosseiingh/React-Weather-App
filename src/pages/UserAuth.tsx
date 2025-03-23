import {
  Input,
  Button,
  InputGroup,
  InputRightElement,
  useToast,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import BackGround from '../assets/images/cloud_sky_pink_177313_1366x768.jpg';
import axios from 'axios';


const UserAuth = () => {
  // define states
  const [isSignIn, setIsSignIn] = useState(true);
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const toast = useToast();

  // handler change situation
  const handleClick = () => setShow(!show);
  const handleToggle = () => setIsSignIn(!isSignIn);

  const handleSignInSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email === '' || password === '') {
      toast({
        title: 'Error',
        description: 'Please fill all fields.',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      });
      return;
    }

    try {
      const response = await axios.post(
        'http://api.alikooshesh.ir:3000/api/users/login',
        { email, password },
        {
          headers: {
            accept: '*/*',
            'Content-Type': 'application/json',
            api_key:
              'Amirhossein-1380sdcBhgHNtYZX5OgAiqKZWWRGOOBUYOBcXGvU2j6RYFrpAQILkWYmyq3FXEw4MOFR7KxES89oP3WCUvvuIpZR3kUI1p4oW0Hebc4cBuxLxED9XzXQ',
          },
        }
      );
      console.log(response.data);
      // handleUserName()
      const token = response.data.accessToken;
      localStorage.setItem('token', token);
      toast({
        title: 'Success',
        description: 'Login successful!',
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      });
      window.location.href = '/weather-search';
    } catch (err) {
      console.error(err);
      toast({
        title: 'Error',
        description: 'Login failed. Please try again.',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      });
    }
  };

  const handleSignUpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (username === '' || email === '' || password === '') {
      toast({
        title: 'Error',
        description: 'Please fill all fields.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    try {
      const response = await axios.post(
        'http://api.alikooshesh.ir:3000/api/users/register',
        { username, email, password },
        {
          headers: {
            accept: '*/*',
            'Content-Type': 'application/json',
            api_key:
              'Amirhossein-1380sdcBhgHNtYZX5OgAiqKZWWRGOOBUYOBcXGvU2j6RYFrpAQILkWYmyq3FXEw4MOFR7KxES89oP3WCUvvuIpZR3kUI1p4oW0Hebc4cBuxLxED9XzXQ',
          },
        }
      );
      const token = response.data.accessToken;
      localStorage.setItem('token', token);
      toast({
        title: 'Success',
        description: 'Registration successful!',
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      });

      window.location.href = '/weather-search';
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Registration failed. Please try again.',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      });
    }
  };

  // const handleUserName = async () => {
  //   console.log('Stored Token:', localStorage.getItem('token'));

  //   const tokens =await localStorage.getItem('token');
  //   if (!tokens) {
  //     console.log('No token found');
  //     return;
  //   }

  //   try {
  //     const res = await axios.get(
  //       'http://api.alikooshesh.ir:3000/api/users/me',
  //       {
  //         headers: {
  //           Authorization: `Bearer ${tokens}`,
  //           accept: '*/*',
  //           api_key:
  //             'Amirhossein-1380sdcBhgHNtYZX5OgAiqKZWWRGOOBUYOBcXGvU2j6RYFrpAQILkWYmyq3FXEw4MOFR7KxES89oP3WCUvvuIpZR3kUI1p4oW0Hebc4cBuxLxED9XzXQ',
  //         },
  //       }
  //     );
  //     console.log(res.data);
  //   } catch (error) {
  //     console.error(error);
  //     console.log('Token:', tokens);
  //   }
  // };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex flex-col items-center justify-center"
      style={{ backgroundImage: `url(${BackGround})` }}
    >
      <div className="flex flex-col items-center justify-center p-4 w-full max-w-md bg-white bg-opacity-70 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-4 text-red-300">
          {isSignIn ? 'Sign In' : 'Sign Up'}
        </h2>
        <form
          onSubmit={isSignIn ? handleSignInSubmit : handleSignUpSubmit}
          className="w-full"
        >
          {!isSignIn && (
            <Input
              type="text"
              placeholder="Username"
              className="mb-4"
              variant="filled"
              value={username}
              onChange={e => setUsername(e.target.value)}
            />
          )}
          <Input
            type="email"
            placeholder="Email"
            className="mb-4"
            variant="filled"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <InputGroup size="md" className="mb-4">
            <Input
              pr="4.5rem"
              type={show ? 'text' : 'password'}
              placeholder="Enter password"
              variant="filled"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={handleClick}>
                {show ? 'Hide' : 'Show'}
              </Button>
            </InputRightElement>
          </InputGroup>
          <Button
            type="submit"
            className="w-full bg-purple-500 text-white py-2 rounded-lg shadow-md"
            disabled={
              email === '' || password === '' || (!isSignIn && username === '')
            }
          >
            {isSignIn ? 'Sign In' : 'Sign Up'}
          </Button>
        </form>
        <div className="text-center mt-4">
          <span className="text-gray-600">
            {isSignIn ? "Don't have an account?" : 'Already have an account?'}
          </span>
          <Button
            onClick={handleToggle}
            className="ml-2 text-purple-500 underline"
          >
            {isSignIn ? 'Sign Up' : 'Sign In'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UserAuth;
