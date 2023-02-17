import './Map.css'

import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';

const Map = ({ coordinates }) => {
  console.log({ coordinates });
  const { lat, lng } = coordinates;
  const center = { lat, lng }

  const { isLoaded } = useLoadScript({ googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_KEY })

  // Determine what to load
  if (!isLoaded) return <div>Loading...</div>
  return (
    <GoogleMap className="map" zoom={12} center={center} mapContainerClassName="map-container">
      <Marker position={{ lat: 40.2, lng: -111.62 }} />
    </GoogleMap>
  )
};

export default Map;