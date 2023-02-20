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
    let newSearchQuery = event.target.value

    setSearchQuery(newSearchQuery);
  };

  return (
    <div className='header__Container'>
      <div className='header__InnerContainer'>
        <img classes={['watermark']} src={allTrailsWatermark} />
        <img classes={['watermark']} src={atLunchIcon} />
      </div>
      <div className='searchBox'>
        <img src={magnifyingGlass} />
        <input 
          className='searchBox__input'
          placeholder='Search restaurants'
          onChange={_debounce(searchQueryChangeHandler, 300)}
        />
      </div>
    </div>
  )
}

export default Header;