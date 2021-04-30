// import { useQuery } from 'react-query';

const Left = ({ api, apiAssets, weather, setWeather, days, months, setSearch, symbol, setLocationID }) => {
    // Get current location
    const getCurrentLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                fetch(`${api}/location/search/?lattlong=${position.coords.latitude},${position.coords.longitude}`)
                    .then((res) => res.json())
                    .then((data) => setLocationID(data[0].woeid))
            })
        } else {
            console.log("Browser does not support Geolocation")
        }
    }

    return (
        <div className="left">
            <div className="header">
                <button onClick={() => {setSearch(true)}} className="searchButton">Search for places</button>
                <button className="location"><span onClick={getCurrentLocation} className="material-icons material-icons-outlined">my_location</span></button>
            </div>
            {weather && <div className="weatherStateImage"><img src={`${apiAssets}/static/img/weather/${weather.consolidated_weather[0].weather_state_abbr}.svg`} alt="Broken"/></div>}
            {/* {weather && <div className="temperature">{parseInt((weather.consolidated_weather[0].the_temp * (9/5)) + 32)} <span>{symbol}</span></div>} */}
            {(weather && symbol === "°C") &&
                <div className="temperature">{parseInt(weather.consolidated_weather[0].the_temp)}<span className="units">{symbol}</span></div>
            }
            {symbol === "°F" &&
                <div className="temperature">{parseInt((weather.consolidated_weather[0].the_temp * (9/5)) + 32)}<span className="units">{symbol}</span></div>
            }
            {weather && <div className="weatherState">{weather.consolidated_weather[0].weather_state_name}</div>}
            <div className="today">Today . {days[new Date().getDay()] + ", " + new Date().getDate() + " " + months[new Date().getMonth()]}</div>
            {weather && <div className="location"><span className="material-icons">place</span> <div className="title">{weather.title}</div></div>}
        </div>
     );
}
 
export default Left;