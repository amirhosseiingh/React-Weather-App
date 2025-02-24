
import { Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router';
import Firstimage from '../assets/images/weatherhub.png';

const Home = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate('/auth');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-800 p-4">
      {/* بخش عکس */}
      <div className="w-full flex justify-center mt-4">
        <img src={Firstimage} alt="Background" className="max-w-full h-72 rounded-lg " />
      </div>

      <div className="text-center text-white mt-4">
        <h1 className="text-3xl  mb-4 font-bold ">What's the weather for today?</h1>
      </div>

      <div className="mt-4">
        <Button 
          size="md" 
          colorScheme='teal' variant='outline'
          border='2px'
          borderColor='gray.500'
          onClick={handleNavigate}
        >
          Get Started
        </Button>
      </div>
    </div>
  );
};

export default Home;
