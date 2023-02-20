import './Map.css'

import ListIcon from '../../assets/list-icon.svg'

import { GoogleMap, useLoadScript, MarkerF } from '@react-google-maps/api';

const Map = ({ isMobile, coordinates, showMap, showListClickHandler }) => {
  const { lat, lng } = coordinates;
  const center = { lat, lng }

  const { isLoaded } = useLoadScript({ googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_KEY })

  const mapClickHandler = (e) => {
    console.log("map was clicked");
    console.log(e);

    let x = 4;
  }

  // Determine what to load
  if (!isLoaded) return <div>Loading...</div>
  return (
    <>
      <GoogleMap 
        mapContainerClassName="map-container map"
        zoom={12}
        center={center}
      >
        <MarkerF
          position={center}
        />
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