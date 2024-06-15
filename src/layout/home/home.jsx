import { Outlet } from "react-router-dom";
import Header from "../../components/header/header";
import "./home.css";

const HomeLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default HomeLayout;
