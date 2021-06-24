import "./index.css";
import React, { useState } from "react";

//sunny, cloudy, windy, rainy, and stormy.

const api = {
  key: "63073033f471e1803099499ec6946d25",
  base: "https://api.openweathermap.org/data/2.5/"
};

export default function App() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});

  const search = (evt) => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then((res) => res.json())
        .then((result) => {
          setWeather(result);
          setQuery("");
        });
    }
  };

  const dateBuilder = (d) => {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ];
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ];
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  };
  return (
    <div
      className={
        typeof weather.main != "undefined"
          ? weather.main.temp < 8
            ? "Snow"
            : weather.weather[0].main
          : "error"
      }
    >
      <main>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="Search..."
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
        {typeof weather.main != "undefined" ? (
          <div>
            <div className="location-box">
              <div className="location">
                {" "}
                {weather.name}, {weather.sys.country}
              </div>
              <div className="date">{dateBuilder(new Date())}</div>
            </div>
            <div className="weather-box">
              <div className="temp">{Math.round(weather.main.temp)}°c</div>
              <div className="weather">{weather.weather[0].main}</div>
            </div>
          </div>
        ) : (
          <div className="error">
            <h1>Welcome to Weather App.</h1>
            <br />
            <h3>
              This is a background changing weather App with Beautiful
              Backgrounds that change according to the weather of the place.{" "}
            </h3>
            <br />
            <h5>
              Please Enter correct spelling of the City you are searching for.
            </h5>
          </div>
        )}
      </main>
      <footer className="footer">
        <h4>
          Made with <b>♥</b> by Kush Munot
        </h4>
      </footer>
    </div>
  );
}
