import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon as fasMoon } from "@fortawesome/free-solid-svg-icons";
import { faMoon as farMoon } from "@fortawesome/free-regular-svg-icons";
import "./header.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [icon, setIcon] = useState(farMoon);

  const [theme, setTheme] = useState(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "light"
  );

  const navigate = useNavigate();

  document.documentElement.setAttribute("data-theme", theme);

  const toggleTheme = () => {
    if (theme === "light") {
      document.documentElement.setAttribute("data-theme", "dark");
      localStorage.setItem("theme", "dark");
      setTheme("dark");
      setIcon(fasMoon);
    } else {
      document.documentElement.setAttribute("data-theme", "light");
      localStorage.setItem("theme", "light");
      setTheme("light");
      setIcon(farMoon);
    }
  };

  const navigateMainPage = () => {
    navigate('/')
  };

  return (
    <header className="header">
      <h1 className="heading-text" onClick={navigateMainPage}>
        Where in the world?
      </h1>

      <div className="theme-toggle-box">
        <FontAwesomeIcon
          style={{
            cursor: "pointer",
          }}
          icon={icon}
          transform={{ rotate: -25 }}
          onClick={toggleTheme}
        />
        <span className="theme-text">{theme} Mode</span>
      </div>
    </header>
  );
};

export default Header;
