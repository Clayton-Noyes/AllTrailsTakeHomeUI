import './App.css';

import { useEffect, useState, useContext } from 'react';
import axios from 'axios';

import AppModal from './components/Modal/AppModal';
import Header from './components/Header/Header';
import PlacesList from './components/PlacesList/PlacesList';
import Map from './components/Map/Map';

// Use the SearchQueryProvider to wrap the entire app in a search query context
//   Now the map component and the header component can both access the search query and its setter function
import { SearchQueryProvider } from './components/Providers/SearchQueryContext';

const App = () => {
  // Stateful data
  const [initialDataReceived, setInitialDataReceived] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [placeData, setPlaceData] = useState([]);
  const [isMobile, setIsMobile] = useState(window.outerWidth < 750);
  const [showList, setShowList] = useState(true);
  const [showMap, setShowMap] = useState(!isMobile);
  const [coordinates, setCoordinates] = useState({ lat: 40.215618, lng: -111.673630 });
  const [selectedPlace, setSelectedPlace] = useState({ object_id: -1 });

  // Pulls data from the back end google places integration
  const getGooglePlacesHandler = async (newSearchQuery) => {
    const { lat, lng } = coordinates
    const body = { lat, lng, radius: 10000, query: newSearchQuery };

    // set is loading to true
    setIsLoading(true);

    // get the google places data from the backend
    const { data } = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/google_places`,
      { places_query: body }
    );

    // set the place data
    setPlaceData(data);

    // set isloading to false
    setIsLoading(false);
  };

  // Sets the place object that is currently selected in the app
  const handleSetSelectedPlace = (newSelectedPlace) => {
    let clicked_object_id = newSelectedPlace.object_id;

    if (selectedPlace.object_id === clicked_object_id) setSelectedPlace({ object_id: -1});
    else setSelectedPlace(newSelectedPlace);
  };

  // Handles updating an individual place object
  const updatePlaceHandler = (updatedPlace) => {
    setPlaceData((prevState) => {
      return prevState.map(prevPlace => {
        if (prevPlace.object_id === updatedPlace.object_id) return updatedPlace;
        else return prevPlace;
      })
    });
  }

  // Handles updating all of the place objects with a new array of place objects
  const updateAllPlacesHandler = (newPlaces) => {
    setPlaceData(newPlaces);
  }

  // Setter that changes what panel is showing, is only used in the buttons that are provided
  //   in the mobile layout
  const changePanel = () => {
    setShowMap(prevState => (!prevState));
    setShowList(prevState => (!prevState));
  }

  // Handle getting initial data
  useEffect(() => {
    if (!initialDataReceived) {
      // Declare the function that will get the initial data that will be used by the application
      const getPlaceData = async () => {
        // Set is loading to true
        setIsLoading(true);

        // Await axios to make the api call to the rails backend to get the data from the db
        let { data } = await axios(`${process.env.REACT_APP_BACKEND_URL}/favorite_places.json`)

        // Set PlaceData
        setPlaceData(data);

        // Set inital data received to true so that the initial data is not retrieved on every render
        setInitialDataReceived(true);

        // Set is loading to false
        setIsLoading(false);
      };
      getPlaceData();
    }
  }, []);

  // Handle the transition between the breakpoints in the app's layout
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
      { isLoading && <AppModal isLoading={isLoading} /> }
      <SearchQueryProvider>
        <Header
          getGooglePlacesHandler={getGooglePlacesHandler}
        />
        {
          showList && (
            <PlacesList
              isMobile={isMobile}
              showList={showList}
              places={placeData}
              coordinates={coordinates}
              showMapClickHandler={changePanel}
              selectedPlace={selectedPlace}
              setSelectedPlace={handleSetSelectedPlace}
              updateAllPlaces={updateAllPlacesHandler}
              updatePlace={updatePlaceHandler}
            />
          )
        }
        {
          showMap && (
            <Map
              isMobile={isMobile}
              coordinates={coordinates}
              places={placeData}
              setCoordinates={setCoordinates}
              showListClickHandler={changePanel}
              selectedPlace={selectedPlace}
              setSelectedPlace={handleSetSelectedPlace}
              showMap={showMap}
              updatePlace={updatePlaceHandler}
            />
          )
        }
      </SearchQueryProvider>
    </div>
  )
}

export default App;
