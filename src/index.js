import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Provider} from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import {store,persistor} from './redux/createStore';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51KwVCTLxzFZHDixzZgfgHjSmNDDRNX2QwBYCd2i337EPBUSsraJYwa07TF0uKbcjIL88MQqSTGB0AUs5icG5Dmrg00w8q8kVuX');

const root = ReactDOM.createRoot(document.getElementById("root"))

root.render(
  <React.StrictMode>
      <Provider store={store}>
        <Elements stripe={stripePromise}>
          <PersistGate persistor={persistor}>
            <App />
          </PersistGate>
        </Elements>
      </Provider>
  </React.StrictMode>,
);

reportWebVitals();
