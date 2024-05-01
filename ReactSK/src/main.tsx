import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import TopBar from './components/TopBar.tsx'
import BottomBar from './components/BottomBar.tsx'
import { Provider } from 'react-redux';
import { store } from './store'
import { AuthContextProvider } from './context/AuthContext.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthContextProvider>
    <Provider store={store}>
      <App />
      
    </Provider>
    </AuthContextProvider>
  </React.StrictMode>
);
