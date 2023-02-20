import './App.css';

import { useEffect, useState, useContext } from 'react';
import axios from 'axios';

import Header from './components/Header/Header';
import PlacesList from './components/PlacesList/PlacesList';
import Map from './components/Map/Map';

// Use the SearchQueryProvider to wrap the entire app in a search query context
//   Now the map component and the header component can both access the search query and its setter function
import { SearchQueryProvider } from './components/Providers/SearchQueryContext';

const App = () => {
  // Stateful data provided
  const [initialData, setInitialData] = useState('');
  const [isMobile, setIsMobile] = useState(window.outerWidth < 750);
  const [showList, setShowList] = useState(true);
  const [showMap, setShowMap] = useState(!isMobile);
  const [coordinates, setCoordinates] = useState({ lat: 40.2, lng: -111.62 })
  const [selectedPlace, setSelectedPlace] = useState({ object_id: -1});

  const handleSetSelectedPlace = (newSelectedPlace) => {
    let clicked_object_id = newSelectedPlace.object_id;

    if (selectedPlace.object_id === clicked_object_id) setSelectedPlace({ object_id: -1});
    else setSelectedPlace(newSelectedPlace);
  };

  // Setter that changes what panel is showing, is only used in the buttons that are provided
  //   for mobile layout
  const changePanel = () => {
    setShowMap(prevState => (!prevState));
    setShowList(prevState => (!prevState));
  }

  // Handle getting initial data
  useEffect(() => {
    if (!initialData) {
      // Declare the function that will get the initial data that will be used by the application
      const getInitialData = async () => {
        // Await axios to make the api call to the rails backend to get the data from the db
        let { data } = await axios(`${process.env.REACT_APP_BACKEND_URL}/favorite_places.json`)

        // Set initialData
        setInitialData(data);
      };
      getInitialData()
    }
  }, []);

  // Handle Resizing the Browser window
  useEffect(() => {
    const handleResize = () => {
      const changedToMobile = window.outerWidth < 750
      setIsMobile(changedToMobile)
      setShowMap(!changedToMobile)
    }

    window.addEventListener('resize', handleResize)
  })

  return (
    <div className="layout">
      <SearchQueryProvider>
        <Header />
        {
          showList && (
            <PlacesList
              isMobile={isMobile}
              showList={showList}
              places={initialData}
              coordinates={coordinates}
              showMapClickHandler={changePanel}
              selectedPlace={selectedPlace}
              setSelectedPlace={handleSetSelectedPlace}
            />
          )
        }
        {
          showMap && (
            <Map
              isMobile={isMobile}
              showMap={showMap}
              coordinates={coordinates}
              setCoordinates={setCoordinates}
              showListClickHandler={changePanel}
            />
          )
        }
      </SearchQueryProvider>
    </div>
  )
}

export default App;
