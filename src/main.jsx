import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google'




createRoot(document.getElementById('root')).render(

  <StrictMode>
    <BrowserRouter>
<GoogleOAuthProvider clientId='798247239831-foas2ecbfpngp8qe7ae7cg6k3i6oa3jl.apps.googleusercontent.com'>
    <App />
    </GoogleOAuthProvider>
    </BrowserRouter>
    
  </StrictMode>,

)
