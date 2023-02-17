import './App.css';

import Header from './components/Header/Header';
import PlacesList from './components/PlacesList/PlacesList';
import Map from './components/Map/Map';

const App = () => {
  const places = [
    {
      id: 1,
      name: "Dominos",
      description: 'Foo bar baz bing, blah blah blah!'
    },
    {
      id: 2,
      name: "Pizza The Hutt",
      description: 'Foo bar baz bing, blah blah blah!'
    },
    {
      id: 3,
      name: "Beto's",
      description: 'Foo bar baz bing, blah blah blah!'
    },
    {
      id: 4,
      name: "Family Friendly Restaurant",
      description: 'Foo bar baz bing, blah blah blah!'
    }
  ];

  return (
    <div className="layout">
      <Header />
      <PlacesList places={places}/>
      <Map />
    </div>
  )
}

export default App;
