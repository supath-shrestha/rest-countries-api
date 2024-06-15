import { useNavigate } from "react-router-dom";
import DataKeyValue from "../data_key_value/data_key_value";
import "./detail_card.css";

const DetailCardComponent = ({ countryDetails }) => {
  const navigate = useNavigate();

  const {
    imageSrc,
    commonName,
    nativeName,
    population,
    region,
    subRegion,
    capital,
    topLevelDomain,
    currencies,
    languages,
    borderCountries,
  } = countryDetails;

  const borderCountriesList = borderCountries.map((borderCountry) => {
    return (
      <span
        key={borderCountry}
        className="border-country"
        onClick={() => {
          navigate("/detail/" + borderCountry);
        }}
      >
        {borderCountry}
      </span>
    );
  });


  return (
    <div className="detail-card">
      <img className="country-flag" src={imageSrc} />

      <div className="country-details-wrapper">
        <span className="common-name">{commonName}</span>

        <div className="country-details-box">
          <div className="country-details-top-box">
            <DataKeyValue text={"Native Name"} value={nativeName} />

            <DataKeyValue
              text={"Population"}
              value={population.toLocaleString()}
            />

            <DataKeyValue text={"Region"} value={region} />

            <DataKeyValue text={"Sub Region"} value={subRegion} />

            <DataKeyValue text={"Capital"} value={capital} />
          </div>

          <div className="country-details-bottom-box">
            <DataKeyValue text={"Top Level Domain"} value={topLevelDomain} />

            <DataKeyValue text={"Currencies"} value={currencies} />

            <DataKeyValue text={"Languages"} value={languages} />
          </div>
        </div>

        {/* some countries do not have border */}
        {borderCountries.length > 0 && (
          <div className="border-countries-box">
            <span className="border-countries-text">Border Countries:</span>
            <div className="border-countries-list">{borderCountriesList}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DetailCardComponent;
