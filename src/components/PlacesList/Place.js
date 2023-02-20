import './Place.css';
import greenStar from '../../assets/green-star.svg'
import deselectedBookmark from '../../assets/bookmark-resting.svg'
import selectedBookmark from '../../assets/bookmark-saved.svg'

import defaultLocationPic from '../../assets/default-place-image.png'

const Place = ({ 
  place,
  updatePlace,
  selectedPlace,
  setSelectedPlace
}) => {
  let { object_id, is_favorite, name, rating, description, number_of_reviews } = place;
  let isSelected = object_id === selectedPlace.object_id;

  let placeContainerNames = "restaurantContainer" + (isSelected ? " selected" : '');
  let reviews = `${number_of_reviews} Reviews`

  const nameClickHandler = () => {
    setSelectedPlace(place);
  }

  const bookmarkClickHandler = async () => {
    // If this object is a favorite then we need to delete it as a favorite
    //   send a delete favorite place request to the back end

    // Otherwise we need to mark it as a favorite and create it in the back end
    //   send a create favorite place request to the back end

    // Update the is_favorite to !is_favorite
    is_favorite = !is_favorite

    // Then update this place in the places array
  }

  return (
    <div className={ placeContainerNames }>
      <img className="restaurantImg" src={defaultLocationPic} />
      <div className="restaurantDetails__Container">
        <button 
          className="restaurantDetails__NameBtn"
          onClick={nameClickHandler}
        >
          {name}
        </button>
        <div className="restaurantDetails__ReviewInfo">
          <img className='restaurantDetails__GreenStar' src={greenStar} />
          <span className='restaurantDetails__Rating'>{rating}</span>
          <span className='restaurantDetails__Spacer'>•</span>
          <span className='restaurantDetails__Reviews'>{reviews}</span>
        </div>
        <span className="restaurantDetails__Description">{description}</span>
      </div>
      <div className="bookmarkContainer">
        <img
          onClick={bookmarkClickHandler}
          className="bookmark"
          src={is_favorite ? selectedBookmark : deselectedBookmark}
        />
      </div>
    </div>
  )
};

export default Place;