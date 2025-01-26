import { createRoot } from 'react-dom/client';
import { Auth0Provider } from '@auth0/auth0-react';
import './index.css';
import App from "./App.jsx";

const root = createRoot(document.getElementById('root'));

// Access the environment variables
const domain = import.meta.env.VITE_API_KEY;
const clientId = import.meta.env.VITE_API_SECRET;

root.render(
  <Auth0Provider
    domain={domain}
    clientId={clientId}
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
  >
    <App />
  </Auth0Provider>,
);
