import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { Toaster } from 'react-hot-toast'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { persistedStore, store } from './redux/store/store'

const rootElement = document.getElementById('root')

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <>
      <Provider store={store}>
        <PersistGate persistor={persistedStore}>
          <App />
          <Toaster />
        </PersistGate>
      </Provider> 
    </>
      
  )
}
