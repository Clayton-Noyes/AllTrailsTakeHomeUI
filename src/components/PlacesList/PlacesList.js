import './PlacesList.css';

import axios from 'axios';

import Place from './Place';

import MapIcon from '../../assets/map-icon.svg';

const PlacesList = ({ 
  places,
  isMobile,
  showList,
  showMapClickHandler,
  selectedPlace,
  setSelectedPlace,
  updatePlace
}) => {

  return (
    <div className='placesOuterContainer'>
      {places.length > 0 && places.map((obj) => (
        <Place
          key={obj.object_id}
          place={obj}
          selectedPlace={selectedPlace}
          setSelectedPlace={setSelectedPlace}
          updatePlace={updatePlace}
        />
      ))}
      {
        (isMobile && showList) && (
          <button
            className='changePanelBtn toMap'
            onClick={showMapClickHandler}
          >
            <img className='listIcon' src={MapIcon} />
            <span>Map</span>
          </button>
        )
      }
    </div>
  )
};

export default PlacesList;