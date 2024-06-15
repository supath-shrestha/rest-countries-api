import { useNavigate } from "react-router-dom";
import "./card.css";
import DataKeyValue from "../data_key_value/data_key_value";

const CardComponent = ({ countryDetails }) => {
  const { imageSrc, commonName, population, region, capital } = countryDetails;
  const navigate = useNavigate();

  const navigateDetailPage = () => {
    navigate("detail/" + commonName);
  };

  return (
    <>
      <div className="card" onClick={navigateDetailPage}>
        <img
          className="country-flag"
          src={imageSrc}
          alt={commonName + " Flag Image"}
        />

        <div className="country-details-box">
          <span className="common-name">{commonName}</span>

          <DataKeyValue text={"Population"} value={population.toLocaleString()} />

          <DataKeyValue text={"Region"} value={region} />

          <DataKeyValue text={"Capital"} value={capital} />
        </div>
      </div>
    </>
  );
};

export default CardComponent;
