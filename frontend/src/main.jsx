import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {Provider} from 'react-redux'
import './index.css'
import App from './App'
import store from './redux/store'
import { Toaster } from './components/ui/toaster'


createRoot(document.getElementById('root')).render(
  
    <Provider store={store}>
      <App />
      <Toaster />
    </Provider>
)
