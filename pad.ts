interface WeatherResponse {
  name: string;
  coord: {
    lon: number;
    lat: number;
  };
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    humidity: number;
  };
  wind: {
    speed: number;
    deg: number;
  };
  sys: {
    sunrise: number;
    sunset: number;
  };
}

const getWeather = async (location: string): Promise<WeatherResponse> => {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${process.env.OPENWEATHER_API_KEY}`,
    );
    return (await response.json()) as Promise<WeatherResponse>;
  } catch (error) {
    console.log(`Error: ${error}`);
    throw new Error();
  }
};

const data = await getWeather("guwahati");
console.log(data.weather);
