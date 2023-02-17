import './Place.css';
import greenStar from '../../assets/green-star.svg'
import deselectedBookmark from '../../assets/bookmark-resting.svg'
import selectedBookmark from '../../assets/bookmark-saved.svg'

import defaultLocationPic from '../../assets/default-place-image.png'

const Place = ({ place }) => {
  let { id, is_favorite, name, rating, description, number_of_reviews } = place;

  let placeContainerNames = "restaurantContainer" + (id === 1 ? " selected" : '');
  let reviews = `${number_of_reviews} Reviews`

  return (
    <div className={ placeContainerNames }>
      <img className="restaurantImg" src={defaultLocationPic} />
      <div className="restaurantDetails__Container">
        <span className="restaurantDetails__Name">{name}</span>
        <div className="restaurantDetails__ReviewInfo">
          <img className='restaurantDetails__GreenStar' src={greenStar} />
          <span className='restaurantDetails__Rating'>{rating}</span>
          <span className='restaurantDetails__Spacer'>•</span>
          <span className='restaurantDetails__Reviews'>{reviews}</span>
        </div>
        <span className="restaurantDetails__Description">{description}</span>
      </div>
      <div className="bookmarkContainer">
        <img className="bookmark" src={is_favorite ? selectedBookmark : deselectedBookmark} />
      </div>
    </div>
  )
};

export default Place;