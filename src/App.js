import './App.css';

import { useEffect, useState } from 'react';
import axios from 'axios';

import Header from './components/Header/Header';
import PlacesList from './components/PlacesList/PlacesList';
import Map from './components/Map/Map';

const App = () => {
  const [ initialData, setInitialData ] = useState('');
  const [ isLoading, setIsLoading ] = useState(false);

  useEffect(() => {
    // Set isLoading to true to indicate that the app is loading data
    setIsLoading((prevState) => (!prevState));

    // Declare the function that will get the initial data that will be used by the application
    const getInitialData = async () => {
      // Await axios to make the api call to the rails backend to get the data from the db
      let { data } = await axios(`${process.env.REACT_APP_BACKEND_URL}/favorite_places.json`)
      
      // Set is loading to false and set the initialData
      setIsLoading((prevState) => (!prevState));
      setInitialData(data);
    };
    getInitialData()
  }, [])

  return (
    <div className="layout">
      <Header />
      <PlacesList places={initialData}/>
      <Map />
    </div>
  )
}

export default App;
