import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Morpion from './morpion/Morpion';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
    <Morpion />,
    document.getElementById('root')
);

registerServiceWorker();
