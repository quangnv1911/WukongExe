import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import routes from './routes/Routes'

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Routes>
        {
          routes.publicRoutes.map((route) => (
            <Route key={route.path}
              path={route.path}
              element={<route.element/>}
            />
          ))
        }
        {
          routes.privateRoutes.map((route) => (
            <Route key={route.path}
              path={route.path}
              element={<route.element/>}
            />
          ))
        }
      </Routes>
    </BrowserRouter>
  )
}

export default App
