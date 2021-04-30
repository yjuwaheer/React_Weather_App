const WeatherCard = ({ date, image, minTemp, maxTemp, apiAssets, days, months, symbol, setSymbol }) => {

    return ( 
        <div className="weatherCard">
            <div className="date">{
                new Date().getDate() + 1 === new Date(date).getDate() ? 
                "Tomorrow" :
                days[new Date(date).getDay()] + ", " + new Date(date).getDate() + " " + months[new Date(date).getMonth()]
            }</div>
            <img height="100" width="100" className="image" src={`${apiAssets}/static/img/weather/${image}.svg`} alt="Broken"/>
            {symbol === "°C" &&
                <div className="temperature">
                    <div className="minTemp">{parseInt(minTemp) + symbol}</div>
                    <div className="maxTemp">{parseInt(maxTemp) + symbol}</div>
                </div>
            }
            {symbol === "°F" &&
                <div className="temperature">
                    <div className="minTemp">{parseInt((minTemp * (9/5)) + 32) + symbol}</div>
                    <div className="maxTemp">{parseInt((maxTemp * (9/5)) + 32) + symbol}</div>
                </div>
            }
        </div>
     );
}
 
export default WeatherCard;