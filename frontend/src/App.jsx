import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { PersistGate } from 'redux-persist/integration/react';
import Header from './components/Header';
import MyRouter from './routes/routes';
import store, { persistor } from './store';
import GlobalStyles from './styles/GlobalStyles';

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <BrowserRouter>
          <Header />
          <MyRouter />
          <GlobalStyles />
          <ToastContainer autoClose={3000} limit={1} />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
}

export default App;
