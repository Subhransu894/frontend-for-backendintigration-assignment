import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import './index.css'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.min.js"
import 'bootstrap-icons/font/bootstrap-icons.css';
import {createBrowserRouter,RouterProvider} from "react-router-dom"
// import App from './App.jsx'
import Event from './components/Event.jsx';
import EventDetails from './components/EventDetails.jsx';
const router=createBrowserRouter([
  {
    path:"/",
    element:<Event/>,
  },
  {
    path:"/events/:eId",
    element:<EventDetails/>,
  },
])
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
