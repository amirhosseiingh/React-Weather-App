export interface WeatherData {
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
