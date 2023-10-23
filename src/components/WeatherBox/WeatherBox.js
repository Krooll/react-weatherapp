import PickCity from '../PickCity/PickCity';
import WeatherSummary from '../WeatherSummary/WeatherSummary';
import Loader from '../Loader/Loader';
import { useCallback, useState } from 'react';

const WeatherBox = () => {
  const [weatherData, setWeatherData] = useState('');
  const [pending, setPending] = useState(false);
  const handleCityChange = useCallback(city => {
      setPending(true);
      fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=cf7c514dc097265b71cb8a0e4a256945&units=metric`)
      .then(res => res.json())
      .then(data => {
      const weatherData = {
        city: data.name,
        temp: data.main.temp,
        icon: data.weather[0].icon,
        description: data.weather[0].main
      };
      setWeatherData(weatherData);
      setPending(false);
  });
});

  return (
    <section>
      <PickCity action={handleCityChange}/>
      {(weatherData && !pending) && <WeatherSummary {...weatherData} /> }
      {pending && <Loader />}
    </section>
  )
};

export default WeatherBox;