import './App.css';

import Header from './components/Header/Header';
import PlacesList from './components/PlacesList/PlacesList';
import Map from './components/Map/Map';

const App = () => {
  return (
    <div className="layout">
      <Header />
      <PlacesList />
      <Map />
    </div>
  )
}

export default App;
