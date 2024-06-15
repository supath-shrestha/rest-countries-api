import CardComponent from "../../components/card/card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import Select from "react-select";
import "./landing.css";
import axios from "axios";

const LandingPage = () => {
  // load the data which was saved before going to detail page of country
  // if user clicks on specific country card without input search and goes to detail page, show data of all country in main page on back button
  // if user clicks on specific country card with input search and goes to detail page, show data of that country in main page on back button
  const [data, setData] = useState(
    localStorage.getItem("data") ? JSON.parse(localStorage.getItem("data")) : []
  );

  const [countryInput, setCountryInput] = useState(
    localStorage.getItem("countryInput")
      ? localStorage.getItem("countryInput")
      : ""
  );

  const [regionInput, setRegionInput] = useState(
    localStorage.getItem("regionInput")
      ? JSON.parse(localStorage.getItem("regionInput"))
      : null
  );

  const regionOptions = [
    { value: "africa", label: "Africa" },
    { value: "america", label: "America" },
    { value: "asia", label: "Asia" },
    { value: "europe", label: "Europe" },
    { value: "oceania", label: "Oceania" },
  ];

  useEffect(() => {
    const getCountriesData = async () => {
      if (data.length === 0) {
        const response = await axios.get("https://restcountries.com/v3.1/all");

        localStorage.setItem("data", JSON.stringify(response.data));
        setData(response.data);
      }
    };
    getCountriesData();
  }, []);

  const countriesList = data.map((country) => {
    let countryDetails = {
      imageSrc: country.flags.png,
      commonName: country.name.common,
      population: country.population,
      region: country.region,
      capital: country.capital,
    };

    return (
      <CardComponent
        key={country.name.common}
        countryDetails={countryDetails}
      ></CardComponent>
    );
  });

  const getCountryDatabyName = async (event) => {
    if (event.key.toLowerCase() === "enter") {
      let url = "https://restcountries.com/v3.1/name/";

      if (event.target.value.trim() === "") {
        url = "https://restcountries.com/v3.1/all";
      } else {
        url += event.target.value.toLowerCase();
      }

      const response = await axios.get(url);

      localStorage.setItem("countryInput", event.target.value);
      localStorage.setItem("data", JSON.stringify(response.data));
      setData(response.data);
    }
  };

  const getCountryDatabyRegion = async (e) => {
    const response = await axios.get(
      "https://restcountries.com/v3.1/region/" + e.value.toLowerCase()
    );

    localStorage.setItem("regionInput", JSON.stringify(e));
    localStorage.setItem("data", JSON.stringify(response.data));
    setRegionInput(e);
    setData(response.data);
  };

  // reload all country data after reloading on main page(for input search)
  window.addEventListener("beforeunload", () => {
    if (location.pathname === "/") {
      localStorage.removeItem("countryInput");
      localStorage.removeItem("regionInput");
      localStorage.removeItem("data");
    }
  });

  return (
    <main className="main">
      <div className="search-bar-plus-region-dropdown-box">
        <div className="search-bar">
          <FontAwesomeIcon icon={faMagnifyingGlass} className="search-icon" />
          <input
            type="text"
            name="countryInput"
            id="countryInput"
            value={countryInput}
            placeholder="Search for a country..."
            onChange={(e) => {
              setCountryInput(e.target.value);
            }}
            onKeyDown={getCountryDatabyName}
            autoComplete="off"
          />
        </div>

        <Select
          className="region-dropdown"
          options={regionOptions}
          value={regionInput}
          placeholder="Filter by Region"
          onChange={getCountryDatabyRegion}
        ></Select>
      </div>

      <div className="country-card-container">{countriesList}</div>
    </main>
  );
};

export default LandingPage;
