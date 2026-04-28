import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {App} from './components/App.tsx'
import './api/setupAxios'
import { GoogleOAuthProvider } from '@react-oauth/google'

const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID?.trim() || 'missing-client-id';
console.log("Loaded Google Client ID:", googleClientId);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={googleClientId}>
      <App />
    </GoogleOAuthProvider>
  </StrictMode>,
)
