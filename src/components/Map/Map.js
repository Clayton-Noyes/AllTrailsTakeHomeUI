import './Map.css'

import ListIcon from '../../assets/list-icon.svg'

import { GoogleMap, useLoadScript, MarkerF } from '@react-google-maps/api';

const Map = ({ isMobile, places, coordinates, showMap, showListClickHandler }) => {
  const { lat, lng } = coordinates;
  const center = { lat, lng }

  const { isLoaded } = useLoadScript({ googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_KEY })

  // const mapClickHandler = (e) => {
  //   console.log("map was clicked");
  //   console.log(e);

  //   let x = 4;
  // }
  // Determine what to load
  if (!isLoaded) return <div>Loading...</div>
  return (
    <>
      <GoogleMap
        mapContainerClassName="map-container map"
        zoom={15}
        center={center}
        initialCenter={center}
      // onClick={mapClickHandler}
      >
        {
          places.map(place => (
            <MarkerF
              key={place.object_id}
              position={{ lat: place.lat, lng: place.lng }}
            />
          ))
        }
      </GoogleMap>
      {
        (isMobile && showMap) && (
          <button
            className='changePanelBtn toList'
            onClick={showListClickHandler}
          >
            <img className='listIcon' src={ListIcon} />
            <span>List</span>
          </button>
        )
      }
    </>
  )
};

export default Map;