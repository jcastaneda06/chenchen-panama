import { Analytics } from '@vercel/analytics/react'
import './App.css'
import { RouterProvider } from 'react-router-dom'
import { router } from './router'

function App() {
  return (
    <>
      <Analytics />
      <RouterProvider router={router} />
    </>
  )
}

export default App
