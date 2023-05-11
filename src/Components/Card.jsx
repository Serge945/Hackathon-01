import { useState, useEffect } from 'react';

function Card() {
  const [data, setData] = useState([]);
  const [searchBar, setSearchBar] = useState('');

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
          console.log('An error occurred while fetching data:', response.status);
        }
      } catch (error) {
        console.log('An error occurred while fetching data:', error);
      }
    };

    fetchData();
  }, [searchBar]);

  return (
    <div>
        <input
            type="text"
            value={searchBar}
            onChange={handleSearch}
            placeholder="Recherche d'images"
        />
        <div className='Card'>
            {data.map((photo) => (
                <img key={photo.id} src={photo.webformatURL} alt={photo.user} />
            ))}
        </div>
    </div>
  );
}

export default Card;









// import {useState} from 'react'
// function Card(){

//     const[data , setData]=useState([]);
//     const pixabey=createApi({
//      accessKey=
//     })
//     const fetchData = ('https://pixabay.com/api/')
//     .then((res)=> res.json()); 
//     .then((data) =>{
//       setData(data)
//       console.log(data)
//     })
//     .catch((error) => {
//         console.log('An error occurred while fetching cupcakes.');
//       });
//   };



//     const[card, setCard]= useState([]); 
//     const unsplash = createApi({
//     accessKey: 'PHKC_MFfJ2Wkk3B3U5CTeEImKLOqVYVzqflDRfCFE84'
//   });
//   const fetchRandomPhotos = async () => {
//     try {
//       const unsplashResponse = await unsplash.photos.getRandom({ count: 9 });
//       setCard(unsplashResponse.response)
//       console.warn(unsplashResponse.response);
//     } catch (error) {
//       console.error(error);
//     }
//   };
//   fetchRandomPhotos();
//   return (
//     <div>{card}</div>
//   )
// }
// export default Card;