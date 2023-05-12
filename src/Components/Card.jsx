import PropTypes from "prop-types";
import { useState, useEffect } from "react";

function Card({ searchBar }) {
  const [data, setData] = useState([]);

  let API_KEY = "36296940-5c9363f2715883ce9a4c16563";

  const handleSearch = (event) => {
    setSearchBar(event.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://pixabay.com/api?key=${API_KEY}&per_page=9&q=${encodeURIComponent(
            searchBar
          )}`
        );

        if (response.ok) {
          const result = await response.json();
          setData(result.hits);
          console.log(result.hits);
        } else {
          console.log(
            "An error occurred while fetching data:",
            response.status
          );
        }
      } catch (error) {
        console.log("An error occurred while fetching data:", error);
      }
    };

    fetchData();
  }, [searchBar]);

  return (
    <div>
      <div className="Card">
        {data.map((photo) => (
          <img key={photo.id} src={photo.webformatURL} alt={photo.user} />
        ))}
      </div>
    </div>
  );
}

export default Card;

Card.propTypes = {
  searchBar: PropTypes.string.isRequired,
};
