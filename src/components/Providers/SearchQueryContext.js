import { createContext, useState } from 'react';

const SearchQueryContext = createContext([{}, () => {}]);

const SearchQueryProvider = (props) => {
  const [state, setState] = useState('');

  return (
    <SearchQueryContext.Provider value={[ state, setState ]} >
      { props.children }
    </SearchQueryContext.Provider>
  )
}

export { SearchQueryContext, SearchQueryProvider };