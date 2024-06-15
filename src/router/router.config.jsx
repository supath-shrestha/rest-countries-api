import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import HomeLayout from "../layout/home/home";
import LandingPage from "../pages/landing/landing";
import DetailPage from "../pages/detail/detail";
import axios from "axios";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<HomeLayout />}>
      <Route path="" element={<LandingPage />} />
      <Route
        path="detail/:countryName"
        element={<DetailPage />}
        loader={async ({ params }) => {
          const response = await axios.get(
            "https://restcountries.com/v3.1/name/" + params.countryName
          );

          // some returns multiple data (e.g. China) so checking country name
          for (let i = 0; i < response.data.length; i++) {
            const country = response.data[i];

            if (
              country["name"]["common"].toLowerCase() ===
              params.countryName.toLowerCase()
            ) {
              return country;
            }
          }
        }}
      />
    </Route>
  )
);

export default router;
