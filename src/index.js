import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import axios from 'axios';
import registerServiceWorker from './registerServiceWorker';

axios.defaults.baseURL = 'https://burger-builder-748c5.firebaseio.com/';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
