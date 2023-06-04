import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Filter = ({ value, onChange }) => {
  return (
    <div>
      <h1>Search for a country</h1>
      <input value={value} onChange={onChange} />
    </div>
  )
}

const CountryList = ({ countries, onShowCountry }) => {
  return (
    <ul>
      {countries.map((country) => (
        <li key={country.name.common}>
          {country.name.common}{' '}
          <button onClick={() => onShowCountry(country.name.common)}>Show</button>
        </li>
      ))}
    </ul>
  )
}


const WeatherInfo = ({ capital }) => {
  const [weather, setWeather] = useState(null)
  const [weatherIcon, setWeatherIcon] = useState('')

  useEffect(() => {
    const apiKey = process.env.REACT_APP_API_KEY
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${apiKey}&units=metric`

    axios
      .get(url)
      .then((response) => {
        setWeather(response.data)
        const iconCode = response.data.weather[0].icon
        const iconUrl = `https://openweathermap.org/img/w/${iconCode}.png`
        setWeatherIcon(iconUrl)
        console.log(response.data)
      })
      .catch((error) => {
        console.log('Error:', error)
      })
  }, [capital])

  return (
    <>
     {weather ? (
      <div>
      <h3>Weather in {capital}</h3>
      <p>
        <b>Temperature: </b>
        {weather.main.temp} Celsius
      </p>
      <p>
        <img alt="Weather Icon" src={weatherIcon} />
      </p>
      <p>
        <b>Wind: </b>
        {weather.wind.speed} m/s
      </p>
    </div>
    ) : (
      <p>Loading weather data...</p>
    )}
    </>
  )
}

const CountryDetails = ({ country }) => {
  const { name, capital, area, languages, flags } = country

  return (
    <div>
      <h1>{name.common}</h1>
      <br />
      <p>Capital: {capital}</p>
      <p>Area: {area}</p>
      <br />
      <h3>Languages:</h3>
      <ul>
        {Object.entries(languages).map(([key, value]) => (
          <li key={key}>{value}</li>
        ))}
      </ul>
      <img src={flags.png} alt="Flag" />
      <WeatherInfo capital={capital} />
    </div>
  )
}

const App = () => {
  const [data, setData] = useState([])
  const [country, setCountry] = useState('')

  useEffect(() => {
    axios.get('https://studies.cs.helsinki.fi/restcountries/api/all').then((response) => {
      setData(response.data)
      console.log('Data:', response.data)
    })
  }, [])

  const filterItems = (array, term) => {
    return array.filter(
      (el) =>
        typeof term === 'string' &&
        el.name.common.toLowerCase().startsWith(term.toLowerCase())
    )
  }

  const countriesToShow = filterItems(data, country)

  const handleCountryChange = (e) => {
    setCountry(e.target.value)
  }

  const handleShowCountry = (countryName) => {
    setCountry(countryName)
  }

  return (
    <div className="App">
      <Filter value={country} onChange={handleCountryChange} />
      {countriesToShow.length > 10 ? (
        <p>Too many matches, specify another filter</p>
      ) : (
        <CountryList
          countries={countriesToShow}
          onShowCountry={handleShowCountry}
        />
      )}
      {countriesToShow.length === 1 && (
        <CountryDetails country={countriesToShow[0]} />
      )}
    </div>
  )
}

export default App