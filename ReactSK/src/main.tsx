import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import TopBar from './components/TopBar.tsx'
import BottomBar from './components/BottomBar.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <div className='flex flex-col h-screen'>
      <TopBar />
      <div className='flex-grow'>
        <App />
      </div>
      <div>
        <div className='mt-auto'>
<BottomBar/>
        </div>
      </div>
    </div>

  </React.StrictMode>,
)
