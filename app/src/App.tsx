import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { persistor, store } from './app/store';
import { Provider, useSelector } from 'react-redux';
import GameRoute from './features/game/components/GameRoute';
import { PersistGate } from 'redux-persist/integration/react';
import PlayRoute from './features/play/components/PlayRoute';
import { selectIsGameActive } from './features/game/selectors';
import GameSettingsRoute from './features/game/components/GameSettingsRoute';

function AppRoutes() {
   const gameActive = useSelector(selectIsGameActive);

   return (
      <Routes>
         <Route path="/" element={<PlayRoute />} />
         {gameActive && <Route path="/game" element={<GameRoute />} />}
         {gameActive && <Route path="/game/settings" element={<GameSettingsRoute />} />}
         <Route path="*" element={<Navigate to="/" />} />
      </Routes>
   );
}

function App() {
   return (
      <Provider store={store}>
         <PersistGate persistor={persistor}>
            <BrowserRouter>
               <AppRoutes />
            </BrowserRouter>
         </PersistGate>
      </Provider>
   );
}

export default App;
