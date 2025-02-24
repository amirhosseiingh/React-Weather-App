import { Input, Button, InputGroup, InputRightElement } from '@chakra-ui/react';
import React, { useState } from 'react';
import BackGround from '../assets/images/cloud_sky_pink_177313_1366x768.jpg';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const UserAuth = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const handleToggle = () => {
    setIsSignIn(!isSignIn);
  };

  const handleSignInSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };
  const handleSignUpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat flex flex-col items-center"
      style={{
        backgroundImage: `url(${BackGround})`,
      }}
    >
      <div className="w-80 flex justify-center py-8  ">
        <DotLottieReact
          src="https://lottie.host/b3d30bb2-5f00-4c38-90dc-d5aea8f69785/4ce91EeNQV.lottie"
          loop
          autoplay
          
        />
      </div>
      <div className="flex flex-col items-center justify-center p-4 w-full max-w-md bg-white bg-opacity-70 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-4">
          {isSignIn ? 'Sign In' : 'Sign Up'}
        </h2>
        <form onSubmit={isSignIn ? handleSignInSubmit : handleSignUpSubmit} className="w-full">
          <Input
            type="email"
            placeholder="Email"
            className="mb-4"
            variant="filled"
          />
          <InputGroup size="md" className="mb-4">
            <Input
              pr="4.5rem"
              type={show ? 'text' : 'password'}
              placeholder="Enter password"
              variant="filled"
            />
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={handleClick}>
                {show ? 'Hide' : 'Show'}
              </Button>
            </InputRightElement>
          </InputGroup>
          {!isSignIn && (
            <Input
              type="text"
              placeholder="Username"
              className="mb-4"
              variant="filled"
            />
          )}
          <Button className="w-full bg-purple-500 text-white py-2 rounded-lg shadow-md">
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
