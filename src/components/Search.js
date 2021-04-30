import { useState, useEffect } from 'react';

const Search = ({ setSearch, api, setLocationID }) => {
    const [location, setLocation] = useState("///")
    const [suggestion, setSuggestion] = useState([]);

    // To fetch suggestions for the location entered
    const fetchSuggestions = () => {
        fetch(`${api}/location/search/?query=${location}`)
            .then((res) => res.json())
            .then((data) => setSuggestion(data))
            .catch((error) => console.log('Invalid input'))
    };

    // Auto updates the suggestion list
    useEffect(() => {
        fetch(`${api}/location/search/?query=${location}`)
            .then((res) => res.json())
            .then((data) => setSuggestion(data))
    }, [location]);

    // Updates the frontend based on the city selected
    const selectedLocation = (placeId) => {
        setLocationID(placeId);
        setSearch(false);
    };

    return ( 
        <div className="search">
            <span className="material-icons close" onClick={() => {setSearch(false)}}>close</span>
            <div className="searchInput">
                <span className="material-icons">search</span>
                <input type="text" placeholder="search location" onKeyUp={(e) => {setLocation(e.target.value)}}/>
                <button onClick={() => fetchSuggestions(location)}>Search</button>
            </div>
            <div className="suggestions">
                {suggestion && suggestion.map((city) => {
                    return <div key={city.woeid} className="suggestion" onClick={() => {selectedLocation(city.woeid)}}>
                        <div className="cityTitle">{city.title}</div>
                        <span className="material-icons">chevron_right</span>
                    </div>
                })}
            </div>
            {(suggestion.length === 0 && location !== "///") && <div className="suggestion">No result found</div>}
            {(location === "///") && <div className="suggestion">Search a location</div>}
        </div>
     );
}
 
export default Search;