import { useContext } from 'react';

// css for this component
import './Header.css';
import _debounce from 'lodash/debounce';

// import the assets needed to display the All Trails logo
import allTrailsWatermark from '../../assets/wordmark.png';
import atLunchIcon from '../../assets/at-lunch.png';
import magnifyingGlass from '../../assets/magnifying-glass.png';

import { SearchQueryContext } from '../Providers/SearchQueryContext';

const Header = () => {
  const [ searchQuery, setSearchQuery ] = useContext(SearchQueryContext);

  const searchQueryChangeHandler = (event) => {
    let newSearchQuery = event.target.value;

    setSearchQuery(newSearchQuery);

    console.log({newSearchQuery, searchQuery});
  };

  const onFormSubmit = e => {
    console.log("Submit event triggered");

    e.preventDefault();
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
            value={searchQuery}
            onChange={_debounce(searchQueryChangeHandler, 300)}
          />
        </form>
      </div>
    </div>
  )
}

export default Header;