// css for this component
import './Header.css';

// import the assets needed to display the All Trails logo
import allTrailsWatermark from '../../assets/Wordmark.png'
import atLunchIcon from '../../assets/AtLunch.png'
import magnifyingGlass from '../../assets/magnifying-glass.png'

const Header = () => {
  return (
    <div className='header__Container'>
      <div className='header__InnerContainer'>
        <img classes={['watermark']} src={allTrailsWatermark} />
        <img classes={['watermark']} src={atLunchIcon} />
      </div>
      <div className='header__InnerContainer searchBox'>
        <img src={magnifyingGlass} />
        <input className='searchBox__input' placeholder='Search restaurants' />
      </div>
    </div>
  )
}

export default Header;