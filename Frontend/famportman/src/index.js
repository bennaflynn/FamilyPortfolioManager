import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

//to make cookies work they need to be the ultimate wrapper
import {CookiesProvider} from 'react-cookie';

ReactDOM.render(
<CookiesProvider>
    <App />
</CookiesProvider>,
 document.getElementById('root')
);
