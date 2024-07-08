import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import $ from 'jquery'; 
import './index.css'
import { CountriesProvider } from './context/countries.jsx'
import { FormProvider } from './context/form.jsx'
import { MsgProvider } from './context/message.jsx'

// Import jQuery // Initialize jQuery globally (window.$) 
window.$ = $;

ReactDOM.createRoot(document.getElementById('root')).render(

    <MsgProvider>
            <CountriesProvider>
                <FormProvider>
                    <App />
                </FormProvider>
            </CountriesProvider>
    </MsgProvider>


)
