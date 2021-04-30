import { useState, useEffect } from 'react';
import Left from "./components/Left";
import Search from "./components/Search";
import Right from "./components/Right";

function App() {
  const api = "https://superlongrandom12345xyz.herokuapp.com/https://www.metaweather.com/api";
  const apiAssets = "https://www.metaweather.com";

  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const [symbol, setSymbol] = useState("°C");

  const [weather, setWeather] = useState();
  const [locationID, setLocationID] = useState('44418');
  const [search, setSearch] = useState(false);
  const [skip, setSkip] = useState(true);

  // Fetch weather data for a given location
  useEffect(() => {
      fetch(`${api}/location/${locationID}/`)
          .then((res) => res.json())
          .then((data) => setWeather(data))
  }, [locationID])

  return (
    <div className="app">
      {!search && <Left api={api} apiAssets={apiAssets} weather={weather} setWeather={setWeather} days={days} months={months} setSearch={setSearch} symbol={symbol} setLocationID={setLocationID} />}
      {search && <Search setSearch={setSearch} api={api} setLocationID={setLocationID}/>}
      <Right api={api} apiAssets={apiAssets} weather={weather} setWeather={setWeather} skip={skip} setSkip={setSkip} days={days} months={months} symbol={symbol} setSymbol={setSymbol}/>
    </div>
  );
}

export default App;
