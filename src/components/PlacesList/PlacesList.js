import './PlacesList.css';

import Place from './Place';

const PlacesList = ({ places }) => {

  return (
    <div className='placesOuterContainer'>
      {places.length > 0 && places.map((obj) => (
        <Place
          key={obj.id}
          restaurant={obj}
        />
      ))}
    </div>
  )
};

export default PlacesList;