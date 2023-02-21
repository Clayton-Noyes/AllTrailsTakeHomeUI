import './Place.css';
import greenStar from '../../assets/green-star.svg'
import deselectedBookmark from '../../assets/bookmark-resting.svg'
import selectedBookmark from '../../assets/bookmark-saved.svg'
import axios from 'axios';

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

  const favPlaceRequestErrorHandler = (e, msg) => {
    console.error(msg);
    console.error(e);
    console.error("\n\n");
  }

  const deleteFavoritePlace = async (place) => {
    const { id } = place;

    if (!id) {
      console.error("Id must be present in order to delete a favorite place");
      return null;
    } else {
      console.log(`Deleting favorite place with id ${id} from database`);
      await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/favorite_places/${id}.json`, place).catch(e => {
        favPlaceRequestErrorHandler(e, "Error encountered while deleting favorite place from database")
      });
    }
  };

  const createFavoritePlace = async (newPlace) => {
    console.log(`Creating new favorite place in database`);
    await axios.post(`${process.env.REACT_APP_BACKEND_URL}/favorite_places.json`, newPlace).catch(e => {
      favPlaceRequestErrorHandler(e, "Error encountered while creating a favorite place in database");
    });
  }

  const bookmarkClickHandler = () => {
    const new_is_favorite_value = !is_favorite;
    const newPlace = { ...place, is_favorite: new_is_favorite_value };
    // If this object is a favorite then we need to delete it as a favorite
    //   send a delete favorite place request to the back end
    if (is_favorite) deleteFavoritePlace(newPlace);
    else createFavoritePlace(newPlace);

    // Update this place in the places array with an is_favorite
    updatePlace(newPlace)
  }

  return (
    <div className={placeContainerNames}>
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