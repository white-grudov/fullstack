import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

const rootElement = document.getElementById('root');

const PORT = process.env.PORT || 3001;

ReactDOM.createRoot(rootElement).render(<App />);

console.log(`Server running on port ${PORT}`);