import React from 'react';
import ReactDOM from 'react-dom/client';
import { RootRouter } from './app/routes';
import './styles/index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <RootRouter />
    </React.StrictMode>,
);
