import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

import App from './App'

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

ReactDOM.createRoot(document.getElementById('root')).render(<App />)