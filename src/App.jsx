import { useState, useEffect } from "react";
import "./App.css";
import MyMap from "./components/MyMap";
import Card from "./components/Card";
import Tiny from "./components/Tiny";
import PlacesList from "./components/PlacesList";
import Slider from "./components/Slider";
import logo from "./assets/img/e_bac-removebg-preview.png";
import plume from "./assets/img/483910.png";
import mapboxgl from "mapbox-gl";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

function App() {
  // const [location, setLocation] = useState(null);
  const [isChosen, setIsChosen] = useState(null);
  const [latitude, setLatitude] = useState(2.136888191793237);
  const [longitude, setLongitude] = useState(43.707299293319366);
  const [searchBar, setSearchBar] = useState("Sailing");
  const [rangeValue, setRangeValue] = useState(10);
  const [isClicked, setIsClicked] = useState(false);

  const handleChange = (result) => {
    // setLocation(result);
    setLatitude(result.center[0]);
    setLongitude(result.center[1]);
    setIsChosen(true);
    setSearchBar(result.text);
  };

  // -----------------------------------------Geocoder-------------------------------------
  useEffect(() => {
    const geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      types: "country,region,place,postcode,locality,neighborhood",
    });
    geocoder.addTo("#geocoder");
    geocoder.on("result", (e) => {
      handleChange(e.result);
      console.log(e);
    });
    // Clear results container when search is cleared.
    geocoder.on("clear", () => {});
  }, []);

  return (
    <>
      <div className="container">
        <div className="flex">
          <div className="header">
            <img src={logo} alt="logo" />
            <div>
              <h1>HOLYMAP</h1>
              <h2>for holidays</h2>
            </div>
          </div>
          <h3>FIND DESTINATION IDEAS</h3>
          <div id="geocoder"></div>
          <Card searchBar={searchBar} />

          <div className="note">
            <PlacesList searchBar={searchBar} />
          </div>
        </div>
        <div className="mapdiv">
          <MyMap
            latitude={latitude}
            longitude={longitude}
            handleChange={handleChange}
            isChosen={isChosen}
            rangeValue={rangeValue}
          />
          <Slider
            maxRange="60"
            defaultRange="10"
            unit="min on bike"
            rangeValue={rangeValue}
            setRangeValue={setRangeValue}
          />
        </div>
        {/* <div className="nota" onClick={handleClick}>
          <img src={plume} alt="plume" />
          <div className="tiny"></div>
          <Tiny />
        </div> */}
      </div>
    </>
  );
}

export default App;
