import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

const rootElement = document.getElementById('root');

ReactDOM.createRoot(rootElement).render(<App />);

const PORT = process.env.PORT || 3001;

console.log(`Server running on port ${PORT}`);