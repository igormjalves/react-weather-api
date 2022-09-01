import { useCallback, useEffect, useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate"
import { geoApiOptions, GEO_API_URL } from "../../api";
import { UilLocationPoint } from "@iconscout/react-unicons";
import "./style.css"

const Search = (props) => {
    
    const [search, setSearch] = useState({value: '-12.970833333 -38.510833333', label: 'Salvador, BR'});
    
    const handleOnChange = useCallback((searchData) => {
        setSearch(searchData)
        props.onSearchChange(searchData);
    }, [props])

    useEffect(() => {
        handleOnChange(search);
    },[])
    
    // const handleOnChange = (searchData) => {
    //     setSearch(searchData);
    //     props.onSearchChange(searchData);
    // };

    const handleLocationClick = () => {
        if(navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const lat = position.coords.latitude
                const lon = position.coords.longitude
                const options = {
                    value: `${lat} ${lon}`
                }
                props.onSearchChange(options)
            })
        }
    };

    // Load properties for input through async requests
    // The inputValue will be passed to the fetch method to the url and to get the data
    const loadOptions = (inputValue) => {
        
        return fetch(`${GEO_API_URL}/cities?minPopulation=1000000&namePrefix=${inputValue}`, geoApiOptions)
            .then(response => response.json())
            .then((response) => {
                return {
                    options: response.data.map(city => {
                        return {
                            value: `${city.latitude} ${city.longitude}`,
                            label: `${city.name}, ${city.countryCode}`,
                        }
                    })
                }
            })
            .catch(err => console.error(err));
    };

    return (
        <div>
            <h1 className="title">Weather App</h1>
            <div className="search">
            <AsyncPaginate
            className="search-bar"
            placeholder="Search for cities"
            debounceTimeout={1000}
            value={search}
            onChange={handleOnChange}
            loadOptions={loadOptions}
            />
            <UilLocationPoint onClick={handleLocationClick} className="searchbar-icon" />
            </div>
        </div>
    )
}

export default Search;