// eslint-disable-next-line no-unused-vars
import React, { Component } from 'react'
import Card from './Components/Card';
import "./App.css"; 
// import { useState } from "react";
import "./App.css";
import MyMap from "./components/MyMap";

export default function App() {
  return (
    <>
    <div className="mapdiv">
        <MyMap latitude={2.136888191793237} longitude={43.707299293319366} />
      </div>
       <Card/>
     </>
  )
}

