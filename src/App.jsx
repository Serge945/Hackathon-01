// import { useState } from "react";
import "./App.css";
import MyMap from "./components/MyMap";

function App() {
  return (
    <>
      <div className="mapdiv">
        <MyMap latitude={2.136888191793237} longitude={43.707299293319366} />
      </div>
    </>
  );
}

export default App;
