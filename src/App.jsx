// eslint-disable-next-line no-unused-vars
import React, { Component } from 'react'
import Card from './Components/Card';
import "./App.css"; 
// import { useState } from "react";
import "./App.css";
import MyMap from "./components/MyMap";

function App() {
  const [location, setLocation] = useState(null);
  const [isChosen, setIsChosen] = useState(null);
  const [latitude, setLatitude] = useState(2.136888191793237);
  const [longitude, setLongitude] = useState(43.707299293319366);

  const handleChange = (result) => {
    setLocation(result);
    setLatitude(result.center[0]);
    setLongitude(result.center[1]);
    setIsChosen(true);
  };

  return (
    <>
      <div className="mapdiv">
        <MyMap
          latitude={latitude}
          longitude={longitude}
          handleChange={handleChange}
          isChosen={isChosen}
        />
      </div>
       <Card/>
     </>
  )
}

export default App