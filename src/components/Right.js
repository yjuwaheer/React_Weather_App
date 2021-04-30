import WeatherCard from "./WeatherCard";

const Right = ({ api, apiAssets, weather, setWeather, skip, setSkip, days, months, symbol, setSymbol }) => {

    return ( 
        <div className="right">
            <div className="header">
                <button onClick={() => {setSymbol("°C")}}>°C</button>
                <button onClick={() => {setSymbol("°F")}}>°F</button>
            </div>
            <div className="weatherCards">
                {weather && weather.consolidated_weather.map(card => {
                    if (skip) {
                        skip = false;
                        return null
                    } else {
                        return <WeatherCard
                            date={card.applicable_date}
                            image={card.weather_state_abbr}
                            minTemp={card.min_temp}
                            maxTemp={card.max_temp}
                            apiAssets={apiAssets}
                            days={days}
                            months={months}
                            symbol={symbol}
                            setSymbol={setSymbol}
                            key={card.applicable_date}
                        />
                    }
                })}
            </div>

            <div className="titleHighlights">Today's Highlights</div>
            <div className="highlights">
                <div className="windStatus highlightCard">
                    <div className="head">Wind Status</div>
                    {weather && <div className="value">{parseInt(weather.consolidated_weather[0].wind_speed)} <span className="units">mph</span></div>}
                    {weather && <div className="direction"><span style={{transform: `rotate(${weather.consolidated_weather[0].wind_direction}deg)`}} className="material-icons">navigation</span> <div>{weather.consolidated_weather[0].wind_direction_compass}</div></div>}
                </div>
                <div className="humidity highlightCard">
                    <div className="head">Humidity</div>
                    {weather && <div className="value">{weather.consolidated_weather[0].humidity}<span className="units">%</span></div>}
                    {weather && <input type="range" min="0" max="100" value={weather.consolidated_weather[0].humidity} disabled/>}
                </div>
                <div className="visibility highlightCard">
                    <div className="head">Visibility</div>
                    {weather && <div className="value">{weather.consolidated_weather[0].visibility.toFixed(1)} <span className="units">miles</span></div>}
                </div>
                <div className="airPressure highlightCard">
                    <div className="head">Air Pressure</div>
                    {weather && <div className="value">{parseInt(weather.consolidated_weather[0].air_pressure)} <span className="units">mb</span></div>}
                </div>
            </div>
        </div>
     );
}
 
export default Right;