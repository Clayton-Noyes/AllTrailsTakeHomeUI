import './Map.css';

import ListIcon from '../../assets/list-icon.svg';
import RestingMarkerIcon from '../../assets/pin-resting.png';
import SelectedMarkerIcon from '../../assets/pin-selected.png';

// Need to use InfoWindowF components to display custom html and css when the marker is selected
// import Place from '../../components/PlacesList/Place';

import {
  GoogleMap,
  MarkerF,
  useLoadScript,
  // InfoWindowF
} from '@react-google-maps/api';

const Map = ({ 
  isMobile,
  coordinates,
  places,
  setCoordinates,
  showListClickHandler,
  selectedPlace,
  setSelectedPlace,
  showMap
}) => {
  const { lat, lng } = coordinates;
  const center = { lat, lng };

  // Start setting up the google map
  const { isLoaded } = useLoadScript({ googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_KEY });

  // Provide a method for a Marker to change the selectedPlace when clicked
  const markerClickHandler = (place) => {
    setCoordinates({ lat: place.lat, lng: place.lng })
    setSelectedPlace(place);
  };

  if (!isLoaded) return <div>Loading...</div>
  return (
    <>
      <GoogleMap
        mapContainerClassName="map-container map"
        zoom={15}
        center={center}
      >
        {
          places.map(place => {
            // TODO: For some reason when you select a new place, the icon is not updating... I am not sure why
            //   this is. I have to research this and see if I can figure it out.
            const isSelected = place.object_id === selectedPlace.object_id;
            const markerImage = (isSelected) ? SelectedMarkerIcon : RestingMarkerIcon;

            return (
              <MarkerF
                id={place.object_id}
                key={place.object_id}
                icon={markerImage}
                onClick={() => (markerClickHandler(place))}
                position={{ lat: place.lat, lng: place.lng }}
              />
            );
          })
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