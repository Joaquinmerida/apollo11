import Caja from "./pages/caja"
import Home from "./pages/home"
import TomarPedidos from './pages/TomarPedidos'
import VerPedidos from './pages/VerPedidos'
import { Routes, Route } from 'react-router-dom'
import {createBrowserRouter,RouterProvider} from "react-router-dom";

const App = () => {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    { path: "/caja",
      element: <Caja />
    },
    { path: "/tomarPedido",
      element: <TomarPedidos />
    },
    { path: "/verPedidos",
      element: <VerPedidos />
    }
  ])

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App