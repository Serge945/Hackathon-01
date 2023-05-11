import PropTypes from "prop-types";
import { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

// ---------------------------------------- FUNCTION----------------------------------------

function MyMap({ latitude, longitude, handleChange, isChosen }) {
  const mapContainer = useRef(null);
  const map = useRef(null);

  const urlBase = "https://api.mapbox.com/isochrone/v1/mapbox/";
  const [profile, setProfile] = useState("cycling");
  const [minutes, setMinutes] = useState(20);
  const [isochrone, setIsochrone] = useState(null);
  const [location, setLocation] = useState(null);

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

  useEffect(() => {
    const start = {
      center: [latitude, longitude],
      zoom: 2,
      antialias: true,
    };
    const end = {
      center: [latitude, longitude],
      zoom: 11,
      antialias: true,
    };

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/thomaslonjon/clhgjollg01ec01p6clov3ebc",
      ...start,
      antialias: true,
    });

    map.current.on("load", () => {
      // When the map loads, add the source and layer

      map.current.addSource("iso", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: [],
        },
      });

      map.current.addLayer(
        {
          id: "isoLayer",
          type: "fill",
          // Use "iso" as the data source for this layer
          source: "iso",
          layout: {},
          paint: {
            // The fill color for the layer is set to a light purple
            "fill-color": "#5a3fc0",
            "fill-opacity": 0.3,
          },
        },
        "poi-label"
      );
      // /////////////////////////////////////////////////////////////////////////

      //   const geocoder = new MapboxGeocoder({
      //     accessToken: mapboxgl.accessToken,
      //     types: "country,region,place,postcode,locality,neighborhood",
      //   });

      //   geocoder.addTo("#geocoder");

      //   geocoder.on("result", (e) => {
      //     handleChange(e.result);
      //     console.log(e);
      //   });

      //   // Clear results container when search is cleared.
      //   geocoder.on("clear", () => {});
      ////////////////////////////////////////////////////////////////////////////////
      fetch(
        `${urlBase}${profile}/${latitude},${longitude}?contours_minutes=${minutes}&polygons=true&access_token=${mapboxgl.accessToken}`,
        { method: "GET" }
      )
        .then((response) => response.json())
        //   .then((data) => console.info("data", data))
        .then((data) => {
          setIsochrone(data);
          map.current.getSource("iso").setData(data);
        })
        .catch((err) => console.error(err));

      map.current.flyTo({
        center: [latitude, longitude],
      });

      if (isChosen) {
        new mapboxgl.Marker()
          .setLngLat([latitude, longitude])
          .addTo(map.current);

        let isAtStart = true;
        const target = isAtStart ? end : start;
        isAtStart = !isAtStart;

        setTimeout(() => {
          map.current.flyTo({
            ...target, // Fly to the selected target
            duration: 10000, // Animate over 60 seconds
            essential: true, // This animation is considered essential with respect to prefers-reduced-motion
          });
        }, 3000);
      }
    });
  }, [latitude, longitude, minutes, profile]);

  // ---------------------------------------- RETURN----------------------------------------

  return (
    <div>
      <div id="geocoder"></div>
      <div className="map-container">
        <div className="map-container-wrapper">
          <div className="map-container-overlay">
            <div ref={mapContainer} className="map" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyMap;

MyMap.propTypes = {
  longitude: PropTypes.number.isRequired,
  latitude: PropTypes.number.isRequired,
};
