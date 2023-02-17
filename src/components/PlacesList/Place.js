import './Place.css';
import greenStar from '../../assets/green-star.svg'
import deselectedBookmark from '../../assets/bookmark-resting.svg'
import selectedBookmark from '../../assets/bookmark-saved.svg'

import defaultLocationPic from '../../assets/default-place-image.png'

const Place = ({ restaurant }) => {
  let { id, name, description } = restaurant;

  return (
    <div className="restaurantContainer">
      <img className="restaurantImg" src={defaultLocationPic} />
      <div className="restaurantDetails__Container">
        <span className="restaurantDetails__Name">{name}</span>
        <div className="restaurantDetails__ReviewInfo">
          <img  className='restaurantDetails__GreenStar' src={greenStar} />
          <span className='restaurantDetails__Rating'>4.7</span>
          <span className='restaurantDetails__Spacer'>•</span>
          <span className='restaurantDetails__Reviews'>3.7K Reviews</span>
        </div>
        <span className="restaurantDetails__Description">{description}</span>
      </div>
      <div className="bookmarkContainer">
        <img className="bookmark" src={id === 1 ? selectedBookmark : deselectedBookmark} />
      </div>
    </div>
  )
};

export default Place;