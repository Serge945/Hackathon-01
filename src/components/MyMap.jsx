import PropTypes from "prop-types";
import { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

// ---------------------------------------- FUNCTION----------------------------------------

function MyMap({ latitude, longitude }) {
  const mapContainer = useRef(null);
  const map = useRef(null);

  const urlBase = "https://api.mapbox.com/isochrone/v1/mapbox/";
  const [profile, setProfile] = useState("cycling");
  const [minutes, setMinutes] = useState(20);
  const [isochrone, setIsochrone] = useState(null);
  const [pointsOfInterest, setPointsOfInterest] = useState(null);

  useEffect(() => {
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/thomaslonjon/clhgjollg01ec01p6clov3ebc",
      center: [longitude, latitude],
      zoom: 11,
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

      fetch(
        `${urlBase}${profile}/${latitude},${longitude}?contours_minutes=${minutes}&polygons=true&access_token=${mapboxgl.accessToken}`,
        { method: "GET" }
      )
        .then((response) => response.json())
        .then((data) => {
          setIsochrone(data);
          map.current.getSource("iso").setData(data);
        })
        .catch((err) => console.error(err));

      fetch(
        `https://api.opentripmap.com/0.1/en/places/radius?radius=5000&lon=${longitude}&lat=${latitude}&format=json&apikey=5ae2e3f221c38a28845f05b6014db662b4937670ab66a0e7ee51a583`
      )
        .then((response) => response.json())
        .then((data) => {
          setPointsOfInterest(data.features);
          map.current.addSource("pointsOfInterest", {
            type: "geojson",
            data: {
              type: "FeatureCollection",
              features: data.features,
            },
          });
          map.current.addLayer({
            id: "pointsOfInterestLayer",
            type: "symbol",
            source: "pointsOfInterest",
            layout: {
              "icon-image": "{icon}-15",
              "icon-allow-overlap": true,
            },
          });
        })
        .catch((err) => console.error(err));
    });
  }, [latitude, longitude, minutes, profile]);

  // ---------------------------------------- RETURN----------------------------------------

  return (
    <div>
      <div className="map-container">
        <div className="map-container-wrapper">
          <div className="map-container-overlay">
            <div ref={mapContainer} className="map" />
          </div>
        </div>
      </div>
      <div className="sidebar">Sidebar</div>
    </div>
  );
}

export default MyMap;

MyMap.propTypes = {
  longitude: PropTypes.number.isRequired,
  latitude: PropTypes.number.isRequired,
};
