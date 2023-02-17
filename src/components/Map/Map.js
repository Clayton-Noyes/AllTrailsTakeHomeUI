import './Map.css'

import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';

const Map = () => {
    const center = { lat: 40.2, lng: -111.65 }

    const { isLoaded } = useLoadScript({ googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_KEY })

    // Determine what to load
    if (!isLoaded) return <div>Loading...</div>
    return (
      <GoogleMap className="map" zoom = { 12 } center={center} mapContainerClassName="map-container"></GoogleMap>
    )
};

export default Map;