import React, { useState, useEffect } from 'react';
import { Input, Button, useToast } from '@chakra-ui/react';
import { FaSearch } from 'react-icons/fa';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import {
  TiWeatherShower,
  TiWeatherSnow,
  TiWeatherStormy,
  TiWeatherSunny,
} from 'react-icons/ti';
import {
  RangeSlider,
  RangeSliderTrack,
  RangeSliderFilledTrack,
  RangeSliderThumb,
} from '@chakra-ui/react';
import SearchPageBg from '../assets/images/sanni-sahil-cSm2a_-25YU-unsplash.jpg';
import { MdDelete, MdFavorite } from 'react-icons/md';
import { MdFavoriteBorder } from 'react-icons/md';
import { GiWindSlap } from 'react-icons/gi';
import { GrLocation } from 'react-icons/gr';
import { BASE_SEARCH_URL } from '../apis/api';
import { API_KEY } from '../apis/api';
import axios from 'axios';

import snowyBg from '../assets/images/Snowybg.jpg';
import sunnyBg from '../assets/images/Sunnybg.jpg';
import cloudyBg from '../assets/images/Cloudybg.jpg';
import rainyBg from '../assets/images/Rainybg.jpg';

const sunnyAnimation =
  'https://lottie.host/d9ba54b4-66b1-4f85-a4e8-56a8e110ad1e/aKUbKxVZ7Y.lottie';
const rainyAnimation =
  'https://lottie.host/f7d0b36f-296e-4fb0-be0f-980a0225fa5b/xiTeIxkEzi.lottie';
const snowyAnimation =
  'https://lottie.host/d8201877-c5f6-495e-958d-ca6444832002/2BPz6iIZFm.lottie';
const cloudyAnimation =
  'https://lottie.host/608fe2ed-f9e4-4e0e-9090-a2c505476c2a/00jzIo9BgD.lottie';

interface WeatherData {
  name: string;
  sys: {
    country: string;
  };
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
  };
  weather: {
    main: string;
    description: string;
    position: string;
  }[];
  clouds: {
    all: number;
  };
  wind: {
    speed: number;
  };
  rain?: {
    ['1h']?: number;
  };
}
const WeatherSearch: React.FC = () => {

  const [city, setCity] = useState<string>('');
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [favorites, setFavorites] = useState<WeatherData[]>([]);
  const [history, setHistory] = useState<WeatherData[]>([]);
  const toast = useToast();


  useEffect(() => {
    const savedFavorites = localStorage.getItem('favorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }

    const savedHistory = localStorage.getItem('history');
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
  },
   []);

   const handleSearch = async () => {
    try {
      const response = await axios.get(
        `${BASE_SEARCH_URL}${city}&appid=${API_KEY}`
      );
      const data = response.data;
      setWeatherData(data);
  
      // افزودن شهر جستجو شده به تاریخچه تنها در صورتی که از قبل وجود نداشته باشد
      if (!history.some(item => item.name === data.name)) {
        const newHistory = [...history, data];
        setHistory(newHistory);
        localStorage.setItem('history', JSON.stringify(newHistory));
      } else {
        toast({
          title: 'City already in search history.',
          description: `${city} is already in your search history.`,
          status: 'warning',
          duration: 2000,
          isClosable: true,
        });
      }
  
      setCity('');
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  

  const getBackgroundImage = (weather: string) => {
    switch (weather) {
      case 'Clear':
        return sunnyBg;
      case 'Rain':
        return rainyBg;
      case 'Clouds':
        return cloudyBg;
      case 'Snow':
        return snowyBg;
      default:
        return sunnyBg;
    }
  };
  const handleSaveButton = () => {
    if (weatherData) {
      if (!favorites.some(item => item.name === weatherData.name)) {

        setFavorites ([...favorites, weatherData]);
        localStorage.setItem(
          'favorites',
          JSON.stringify([...favorites, weatherData])
        );
        toast({
            title: 'City added to favorites.',
          description: `${weatherData.name} has been added to your favorite cities.`,
          status: 'success',
          duration: 2000,
          isClosable: true,
        });
        
      } else {
        toast({
          title: 'City already in favorites.',
          description: `${weatherData.name} is already in your favorite cities.`,
          status: 'warning',
          duration: 2000,
          isClosable: true,
        });
      }
    }
  };
  const handleDelete = (city: string) => {
    const updatedFavorites = favorites.filter(item => item.name !== city);

    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));

    toast({
      title: 'City removed from favorites.',
      description: `${city} has been removed from your favorite cities.`,
      status: 'warning',
      duration: 2000,
      isClosable: true,
    });
  };
  const getAnimation = (weather: string) => {
    switch (weather) {
      case 'Clear':
        return sunnyAnimation;
      case 'Rain':
        return rainyAnimation;
      case 'Clouds':
        return cloudyAnimation;
      case 'Snow':
        return snowyAnimation;
      default:
        return sunnyAnimation;
    }
  };

  const getWeatherIcon = (weather: string) => {
    switch (weather) {
      case 'Clear':
        return <TiWeatherSunny className="text-yellow-500 text-4xl" />;
      case 'Rain':
        return <TiWeatherShower className="text-blue-500 text-4xl" />;
      case 'Clouds':
        return <TiWeatherStormy className="text-gray-500 text-4xl" />;
      case 'Snow':
        return <TiWeatherSnow className="text-white text-4xl" />;
      default:
        return <TiWeatherSunny className="text-yellow-500 text-4xl" />;
    }
  };

  const animationSrc = weatherData
    ? getAnimation(weatherData.weather[0].main)
    : '';
  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat flex flex-col items-center relative"
      style={{ backgroundImage: `url(${SearchPageBg})` }}
    >
      <h1 className="text-3xl font-bold text-white my-8">Search for Weather</h1>
      <div className="flex flex-row justify-center items-center gap-3">
        <Input
          value={city}
          onChange={e => setCity(e.target.value)}
          placeholder="Enter city name"
          className="mb-4"
          size="lg"
          textColor={'whiteAlpha.900'}
        />
        <Button
          size={'lg'}
          p={'6'}
          colorScheme="teal"
          onClick={handleSearch}
          mb={4}
          leftIcon={<FaSearch />}
        >
          Search
        </Button>
      </div>
      {weatherData && (
        <div className="text-black font-thin mt-4 flex flex-col rounded-lg items-center bg-white opacity-80 p-5 relative">
          <div className="flex flex-row justify-center items-center">
            <GrLocation className="text-2xl text-purple-600" />
            <h2 className="text-2xl font-bold m-2">
              {weatherData.name}, {weatherData.sys.country}
            </h2>
          </div>
          <DotLottieReact src={animationSrc} loop autoplay />
          <p className="font-bold text-slate-700 text-4xl mb-2">
            {Math.round(weatherData.main.temp - 273.15)}°C
          </p>
          <p className="text-lg font-semibold text-slate-800">
            {weatherData.weather[0].description}
          </p>
          <div className="grid grid-cols-2 justify-center items-center gap-2 mt-3 text-white">
            <div className="bg-gray-500 p-4 rounded-xl text-center">
              <p>
                Feels Like: {Math.round(weatherData.main.feels_like - 273.15)}°C
              </p>
            </div>
            <div className="bg-gray-500 p-4 rounded-xl text-center">
              <p>
                {Math.round(weatherData.main.temp_min - 273.15)}°C /{' '}
                {Math.round(weatherData.main.temp_max - 273.15)}°C
              </p>
            </div>
            <div className="bg-gray-500 p-4 rounded-xl text-center">
              <div className="flex justify-center items-center gap-2">
                <p>{weatherData.wind.speed} M/S</p>
                <GiWindSlap />
              </div>
            </div>
            <div className="bg-gray-500 p-4 rounded-xl text-center">
              <p>Rain: {weatherData.rain?.['1h'] || 0} mm</p>
            </div>
          </div>
          <MdFavoriteBorder
            className="text-purple-700 text-2xl absolute top-2 right-3 position hover:text-red-600"
            onClick={handleSaveButton}
          />
          <div className="w-[50%] mt-4 flex flex-col justify-center items-center">
            <p>Cloudiness: {weatherData.clouds.all}%</p>
            <RangeSlider
              value={[weatherData.clouds.all]}
              min={0}
              max={100}
              step={1}
              isReadOnly
            >
              <RangeSliderTrack>
                <RangeSliderFilledTrack />
              </RangeSliderTrack>
              <RangeSliderThumb index={0} />
            </RangeSlider>
          </div>
        </div>
      )}
      <div className="text-white mt-8 flex flex-col justify-center items-center">
        <h2 className="text-2xl font-bold text-center mb-3 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 ... p-3 w-96 rounded text-yellow-400">
          Search History
        </h2>
        <div className="flex flex-wrap justify-center items-center gap-3">
          {history.length > 0 ? (
            history.map(
              (city, index) =>
                city.weather &&
                city.weather[0] && (
                  <div
                    key={index}
                    className="mb-4 mr-4 p-4 w-64 rounded-lg flex flex-col items-center relative"
                    style={{
                      backgroundImage: `url(${getBackgroundImage(
                        city.weather[0].main
                      )})`,
                      backgroundSize: 'cover',
                    }}
                  >
                    <div className="flex flex-row gap-2 justify-center items-center">
                      <h3 className="text-xl font-bold">{city.name}</h3>
                      <p className="text-white">{city.sys.country}</p>
                    </div>
                    <p className="font-semibold text-yellow-500 mt-2">
                      {Math.round(city.main.temp - 273.15)}°C
                    </p>
                  </div>
                )
            )
          ) : (
            <p>No search history yet.</p>
          )}
        </div>
      </div>
      <div className="text-white mt-8 flex flex-col justify-center items-center">
        <h2 className="text-2xl font-bold text-center mb-3 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 ... p-3 w-96 rounded text-yellow-400">
          Favorite Cities
        </h2>
        <div className="flex flex-wrap justify-center items-center gap-3">
          {favorites.length > 0 ? (
            favorites.map(
              fav =>
                fav.weather &&
                fav.weather[0] && (
                  <div
                    key={fav.name}
                    className="mb-4 mr-4 p-4 w-64 rounded-lg flex flex-col items-center relative"
                    style={{
                      backgroundImage: `url(${getBackgroundImage(
                        fav.weather[0].main
                      )})`,
                      backgroundSize: 'cover',
                    }}
                  >
                    <h3 className="text-xl font-bold">
                      {fav.name}, {fav.sys.country}
                    </h3>
                    <p className="font-semibold text-yellow-500">
                      {' '}
                      {Math.round(fav.main.temp - 273.15)}°C
                    </p>
                    <p className="text-sm">{fav.weather[0].description}</p>
                    {getWeatherIcon(fav.weather[0].main)}
                    <MdDelete
                      className="text-xl text-yellow-500 absolute bottom-2 right-2 hover:text-green-700"
                      onClick={() => handleDelete(fav.name)}
                    />
                    <MdFavorite className="text-red-700 text-2xl absolute top-2 right-2" />
                  </div>
                )
            )
          ) : (
            <p>No favorite cities added yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};
export default WeatherSearch;
