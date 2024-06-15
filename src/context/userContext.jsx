import { RouterProvider } from "react-router-dom";
import router from "../router/router.config";
import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const UserContext = createContext();

const App = () => {
  let countryCode = {};

  let [countryCodeList, setCountryCodeList] = useState({});

  useEffect(() => {
    const getCountriesData = async () => {
      const response = await axios.get("https://restcountries.com/v3.1/all");

      response.data.forEach((country) => {
        countryCode = {
          ...countryCode,
          [country["cca3"]]: country["name"]["common"],
        };
      });

      setCountryCodeList(countryCode);
    };

    getCountriesData();
  }, []);

  return (
    <UserContext.Provider value={countryCodeList}>
      <RouterProvider router={router} />
    </UserContext.Provider>
  );
};

export default App;
