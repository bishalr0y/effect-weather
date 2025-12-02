const getWeather = async (location: string) => {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${process.env.OPENWEATHER_API_KEY}`,
    );
    const json = await response.json();
    console.log(json);
  } catch (error) {
    console.log(error);
  }
};

getWeather("guwahati");
