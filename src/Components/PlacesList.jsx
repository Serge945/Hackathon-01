import { useState } from "react";

const apiKey = "5ae2e3f221c38a28845f05b6014db662b4937670ab66a0e7ee51a583";
const pageLength = 5;

function PlacesList() {
  const [lon, setLon] = useState(null);
  const [lat, setLat] = useState(null);
  const [count, setCount] = useState(null);
  const [offset, setOffset] = useState(0);
  const [places, setPlaces] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState(null);

  function apiGet(method, query) {
    return fetch(
      `https://api.opentripmap.com/0.1/en/places/${method}?apikey=${apiKey}&${query}`
    ).then((response) => response.json());
  }

  function handleSearch(event) {
    event.preventDefault();
    const name = event.target.elements.search.value;
    apiGet("geoname", `name=${name}`).then((data) => {
      if (data.status === "OK") {
        setLon(data.lon);
        setLat(data.lat);
        setOffset(0);
        setCount(null);
        setSelectedPlace(null);
        loadList(data.lon, data.lat);
      } else {
        alert("Place not found");
      }
    });
  }

  function loadList(lon, lat) {
    apiGet(
      "radius",
      `radius=1000&limit=${pageLength}&offset=${offset}&lon=${lon}&lat=${lat}&rate=2&format=json`
    ).then((data) => {
      setPlaces(data);
      if (count === null) {
        apiGet(
          "radius",
          `radius=1000&limit=1&offset=0&lon=${lon}&lat=${lat}&rate=2&format=count`
        ).then((data) => setCount(data.count));
      }
    });
  }

  function handleNext() {
    setOffset(offset + pageLength);
    loadList(lon, lat);
  }

  function handlePlaceClick(id) {
    setSelectedPlace(id);
    apiGet(`xid/${id}`).then((data) => {
      showDescription(data);
    });
  }

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input type="text" name="search" placeholder="Search place" />
        <button type="submit">Search</button>
      </form>
      {places.length > 0 && (
        <div>
          <p>
            Showing {offset + 1} to {offset + places.length} of {count} places
          </p>
          <ul>
            {places.map((place) => (
              <li
                key={place.xid}
                className={place.xid === selectedPlace ? "selected" : ""}
                onClick={() => handlePlaceClick(place.xid)}
              >
                {place.name}
              </li>
            ))}
          </ul>
          {offset + places.length < count && (
            <button onClick={handleNext}>Next</button>
          )}
        </div>
      )}
    </div>
  );
}

function showDescription(data) {
  alert(data.wikipedia_extracts.text);
}

export default PlacesList;

// import React, { useState, useEffect } from "react";

// const apiKey = "5ae2e3f221c38a28845f05b6014db662b4937670ab66a0e7ee51a583"; // Inserisci la tua API key qui

// const PlacesList = () => {
//   const pageLength = 5; // numero di oggetti per pagina
//   const [lon, setLon] = useState(null); // longitudine del luogo
//   const [lat, setLat] = useState(null); // latitudine del luogo
//   const [offset, setOffset] = useState(0); // offset dal primo oggetto nella lista
//   const [count, setCount] = useState(0); // conteggio totale degli oggetti

//   // Funzione per chiamare l'API usando fetch
//   const apiGet = (method, query) => {
//     return fetch(
//       `https://api.opentripmap.com/0.1/en/places/${method}?apikey=${apiKey}${
//         query ? "&" + query : ""
//       }`
//     )
//       .then((response) => response.json())
//       .catch((error) => {
//         console.log("Fetch Error :-S", error);
//       });
//   };

//   // Funzione per ottenere il nome del paese
//   const getCountryName = (country) => {
//     // Implementa questa funzione in base alle tue esigenze
//   };

//   // Funzione per caricare la prima pagina degli oggetti
//   const firstLoad = () => {
//     apiGet(
//       "radius",
//       `radius=1000&limit=${pageLength}&offset=${offset}&lon=${lon}&lat=${lat}&rate=2&format=count`
//     ).then((data) => {
//       setCount(data.count);
//       setOffset(0);
//       document.getElementById(
//         "info"
//       ).innerHTML += `<p>${data.count} objects with description in a 1km radius</p>`;
//       loadList();
//     });
//   };

//   // Funzione per caricare la lista degli oggetti nella pagina
//   const loadList = () => {
//     apiGet(
//       "radius",
//       `radius=1000&limit=${pageLength}&offset=${offset}&lon=${lon}&lat=${lat}&rate=2&format=json`
//     ).then((data) => {
//       let list = document.getElementById("list");
//       list.innerHTML = "";
//       data.forEach((item) => list.appendChild(createListItem(item)));
//       let nextBtn = document.getElementById("next_button");
//       if (count < offset + pageLength) {
//         nextBtn.style.visibility = "hidden";
//       } else {
//         nextBtn.style.visibility = "visible";
//         nextBtn.innerText = `Next (${offset + pageLength} of ${count})`;
//       }
//     });
//   };

//   // Funzione per creare un elemento della lista
//   const createListItem = (item) => {
//     let a = document.createElement("a");
//     a.className = "list-group-item list-group-item-action";
//     a.setAttribute("data-id", item.xid);
//     a.innerHTML = `<h5 class="list-group-item-heading">${item.name}</h5>
//               <p class="list-group-item-text">${getCountryName(
//                 item.kinds
//               )}</p>`;

//     a.addEventListener("click", function () {
//       document.querySelectorAll("#list a").forEach(function (item) {
//         item.classList.remove("active");
//       });
//       this.classList.add("active");
//       let xid = this.getAttribute("data-id");
//       apiGet("xid/" + xid).then((data) => onShowPOI(data));
//     });
//     return a;
//   };

//   // Funzione per mostrare l'anteprima e la descrizione nella sezione destra
//   const onShowPOI = (data) => {
//     let poi = document.getElementById("poi");
//     poi.innerHTML = "";
//     if (data.preview) {
//       poi.innerHTML += `<img src="${data.preview.source}">`;
//     }
//     poi.innerHTML += data.wikipedia_extracts
//       ? data.wikipedia_extracts.html
//       : data.info
//       ? data.info.descr
//       : "No description";

//     poi.innerHTML += `<p><a target="_blank" href="${data.otm}">Show more at OpenTripMap</a></p>`;
//   };

//   // Funzione per gestire il click del pulsante "Next page"
//   const handleNextPage = () => {
//     setOffset(offset + pageLength);
//   };

//   // Funzione per gestire la sottomissione del modulo di ricerca
//   const handleSearchSubmit = (event) => {
//     event.preventDefault();
//     let name = document.getElementById("textbox").value;
//     apiGet("geoname", `name=${name}`).then((data) => {
//       let message = "Name not found";
//       if (data.status === "OK") {
//         message = `${data.name}, ${getCountryName(data.country)}`;
//         setLon(data.lon);
//         setLat(data.lat);
//         firstLoad();
//       }
//       document.getElementById("info").innerHTML = `${message}`;
//     });
//   };

//   useEffect(() => {
//     // Chiamata iniziale per ottenere i dati iniziali
//     firstLoad();
//   }, []);

//   return (
//     <div>
//       <form id="search_form" onSubmit={handleSearchSubmit}>
//         <input type="text" id="textbox" />
//         <button type="submit">Search</button>
//       </form>
//       <div id="info"></div>
//       <div id="list"></div>
//       <button id="next_button" onClick={handleNextPage}>
//         Next
//       </button>
//       <div id="poi"></div>
//     </div>
//   );
// };

// export default PlacesList;
