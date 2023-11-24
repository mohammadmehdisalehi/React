import React from 'react';
import { type FC } from 'react';
// import * as ReactDOM from "react-dom/client";
import LoginPage from './Pages/Loginpage';
import RegisterPage from './Pages/Register';
import {createBrowserRouter,RouterProvider} from "react-router-dom";
import Layout from './Components/layout';

const App: FC = () => {
  const [isLoggedIn, setLoggedIn] = React.useState(false);
  const handleLogin = () => {
    setLoggedIn(true);
  };

  return(
    <RouterProvider router={ createBrowserRouter([
      {
        path: "/",
        element: <Layout />,
        children:[
          {
            path: "/login",
            element: <LoginPage />,
          },
          {
            path: "/register",
            element: <RegisterPage />,
          },

        ]
      },
    ])}
  />
  );
};
export default App;
