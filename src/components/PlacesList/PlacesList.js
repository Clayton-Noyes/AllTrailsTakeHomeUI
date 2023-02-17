import './PlacesList.css';

import axios from 'axios';

import Place from './Place';

const PlacesList = ({ places, coordinates }) => {
  const { lat, lng } = coordinates
  const body = { lat, lng, radius: 10000};

  const googleDataClickHandler = async () => {
    const { data } = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/google_places`, { places_query: body })
    console.log({ data })
  }

  return (
    <div className='placesOuterContainer'>
      <button 
        className='getGoogleData'
        onClick={googleDataClickHandler}
      >
        Grab Dat Data
      </button>
      {places.length > 0 && places.map((obj) => (
        <Place
          key={obj.id}
          place={obj}
        />
      ))}
    </div>
  )
};

export default PlacesList;