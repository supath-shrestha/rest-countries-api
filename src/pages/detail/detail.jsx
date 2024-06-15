import { useContext } from "react";
import { useLoaderData, useNavigate} from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeftLong } from "@fortawesome/free-solid-svg-icons";
import DetailCardComponent from "../../components/detail_card/detail_card";
import "./detail.css";

import { UserContext } from "../../context/userContext";

const DetailPage = () => {
  const data = useLoaderData();

  const countryCodeList = useContext(UserContext);

  const navigate = useNavigate();

  const getNativeName = () => {
    let nativeNameObj = data["name"]["nativeName"];
    let nativeName = "";

    for (const key in nativeNameObj) {
      if (Object.hasOwnProperty.call(nativeNameObj, key)) {
        const element = nativeNameObj[key];
        nativeName = element["common"];
      }
    }

    return nativeName;
  };

  const getCurrencies = () => {
    let currencyObj = data["currencies"];
    let currencyList = [];

    for (const key in currencyObj) {
      if (Object.hasOwnProperty.call(currencyObj, key)) {
        const element = currencyObj[key];
        currencyList.push(element["name"]);
      }
    }

    return currencyList.join(", ");
  };

  const getLanguages = () => {
    let languageObj = data["languages"];
    let languageList = [];

    for (const key in languageObj) {
      if (Object.hasOwnProperty.call(languageObj, key)) {
        languageList.push(languageObj[key]);
      }
    }

    return languageList.join(", ");
  };

  const getCountryDetails = () => {
    let countryDetails = {
      imageSrc: data["flags"]["png"],
      commonName: data["name"]["common"],
      nativeName: getNativeName(),
      population: data["population"],
      region: data["region"],
      subRegion: data["subregion"],
      capital: data["capital"],
      topLevelDomain: data["tld"],
      currencies: getCurrencies(),
      languages: getLanguages(),
      borderCountries: data["borders"]
        ? data["borders"].map((border) => countryCodeList[border])
        : [],
    };

    return countryDetails;
  };

  const navigateMainPage = () => {
    navigate(-1);
  };

  return (
    <main className="detail-page-main">
      <div className="back-btn" onClick={navigateMainPage}>
        <FontAwesomeIcon className="left-arrow" icon={faArrowLeftLong} />
        <span className="back-btn-text">Back</span>
      </div>

      {data != null ? (
        <DetailCardComponent countryDetails={getCountryDetails()} />
      ) : (
        <></>
      )}
    </main>
  );
};

export default DetailPage;
