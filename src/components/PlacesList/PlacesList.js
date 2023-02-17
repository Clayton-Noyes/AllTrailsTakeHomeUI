import './PlacesList.css';

import Place from './Place';

const PlacesList = () => {
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
    <div className='placesOuterContainer'>
      {places.length > 0 && places.map((obj) => (
        <Place
          key={obj.id}
          restaurant={obj}
        />
      ))}
    </div>
  )
};

export default PlacesList;