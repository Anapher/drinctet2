import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { persistor, store } from './app/store';
import { Provider } from 'react-redux';
import GameRoute from './features/game/components/GameRoute';
import { PersistGate } from 'redux-persist/integration/react';
import PlayRoute from './features/play/components/PlayRoute';

function App() {
   return (
      <Provider store={store}>
         <PersistGate persistor={persistor}>
            <BrowserRouter>
               <Routes>
                  <Route path="/" element={<PlayRoute />} />
                  <Route path="/game" element={<GameRoute />} />
               </Routes>
            </BrowserRouter>
         </PersistGate>
      </Provider>
   );
}

export default App;
