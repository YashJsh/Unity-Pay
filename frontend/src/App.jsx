import {createBrowserRouter, RouterProvider, Navigate} from "react-router-dom"
import Signin from "./pages/signin"
import SignUp from "./pages/SignUp"
import SendMoney from "./pages/SendMoney"
import Dashboard from "./pages/Dashboard"
import ProtectedRoute from "./components/ProtectedRoute"
import UserList from "./pages/UserList"


const routes = createBrowserRouter(
  [
    {
      path: "/",
      element: localStorage.getItem('token') ? 
               <Navigate to="/dashboard" replace /> : 
               <Navigate to="/signin" replace />
    },
    {path: "/signin", element : <Signin/>},
    {path: "/signup", element : <SignUp/>},
    {path: "/transaction", element : <ProtectedRoute><SendMoney /></ProtectedRoute>},
    {path: "/dashboard", element : <ProtectedRoute><Dashboard /></ProtectedRoute>},
    {path: "/user", element : <ProtectedRoute><UserList /></ProtectedRoute>}
  ] 
)

function App() {
  return (
    <>
      <RouterProvider router={routes}></RouterProvider>
    </>
  )
}

export default App
