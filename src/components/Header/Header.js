import { useContext } from 'react';

// css for this component
import './Header.css';
import _debounce from 'lodash/debounce';

// import the assets needed to display the All Trails logo
import allTrailsWatermark from '../../assets/wordmark.png';
import atLunchIcon from '../../assets/at-lunch.png';
import magnifyingGlass from '../../assets/magnifying-glass.png';

// Pull in the search query context
import { SearchQueryContext } from '../Providers/SearchQueryContext';

const Header = ({
  getGooglePlacesHandler
}) => {
  const [ searchQuery, setSearchQuery ] = useContext(SearchQueryContext);

  // Handler to update the searchQuery while the user is typing
  const searchQueryChangeHandler = async (event) => {
    let newSearchQuery = event.target.value;

    setSearchQuery(newSearchQuery);
  };

  // Handler that initiates the call to get new google places data from the rails server
  const onFormSubmit = async (e) => {
    e.preventDefault();

    await getGooglePlacesHandler(searchQuery);
  }

  return (
    <div className='header__Container'>
      <div className='header__InnerContainer'>
        <img classes={['watermark']} src={allTrailsWatermark} />
        <img classes={['watermark']} src={atLunchIcon} />
      </div>
      <div className='searchBox'>
        <form onSubmit={onFormSubmit}>
          <button type="submit">
            <img src={magnifyingGlass} />
          </button>
          <input 
            className='searchBox__input'
            placeholder='Search restaurants'
            onChange={searchQueryChangeHandler}
          />
        </form>
      </div>
    </div>
  )
}

export default Header;