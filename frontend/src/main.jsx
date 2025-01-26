import { createRoot } from 'react-dom/client';
import { Auth0Provider } from '@auth0/auth0-react';
import './index.css'
import App from "./App.jsx";
const root = createRoot(document.getElementById('root'));

root.render(
<Auth0Provider
    domain="dev-3mm6r7oq8nuo3eus.us.auth0.com"
    clientId="4DEyHWFo3gk6qKhP06VOJzdNMJNKyrRA"
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
  >
    <App />
  </Auth0Provider>,
);
