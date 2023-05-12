import { useState } from "react";
import "./App.css";
import MyMap from "./components/MyMap";
import Card from "./components/Card";
import Tiny from "./components/Tiny";
import PlacesList from "./components/PlacesList";
import Slider from "./components/Slider";

function App() {
  // const [location, setLocation] = useState(null);
  const [isChosen, setIsChosen] = useState(null);
  const [latitude, setLatitude] = useState(2.136888191793237);
  const [longitude, setLongitude] = useState(43.707299293319366);
  const [searchBar, setSearchBar] = useState("sailing");
  const [rangeValue, setRangeValue] = useState(10);

  const handleChange = (result) => {
    // setLocation(result);
    setLatitude(result.center[0]);
    setLongitude(result.center[1]);
    setIsChosen(true);
    setSearchBar(result.text);
  };

  return (
    <>
      <div className="mapdiv">
        <MyMap
          latitude={latitude}
          longitude={longitude}
          handleChange={handleChange}
          isChosen={isChosen}
          rangeValue={rangeValue}
        />
      </div>
      <Slider
        maxRange="60"
        defaultRange="10"
        unit="min on bike"
        rangeValue={rangeValue}
        setRangeValue={setRangeValue}
      />
      <Card searchBar={searchBar} />
      <Tiny />

      <div className="note">
        <PlacesList />
      </div>
    </>
  );
}

export default App;
