import React, { createContext, useState } from 'react';

import css from './App.module.css';
import { Header, ReservoirsList } from './components';

export const AppContext = createContext(null);

function App() {
  const [allTrigger, setAllTrigger] = useState(null);
  const [loadTrigger, setLoadTrigger] = useState(0);

  return (
    <AppContext.Provider value={{allTrigger, setAllTrigger, loadTrigger, setLoadTrigger}}>
      <div className={css.app}>
        <Header/>
        <ReservoirsList/>
      </div>
    </AppContext.Provider>
  );
}

export default App;
