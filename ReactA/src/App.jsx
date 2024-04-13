import { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login";
import Main from "./pages/Main";
import JoinSession from "./pages/JoinSession";
import CreateTaste from "./pages/CreateTaste";
import NotFoundPage from "./otherPages/NotFoundPage";
import "./css/App.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
    errorElement: <NotFoundPage />,
  },
  {
    path: "/main",
    element: <Main />,
  },
  {
    path: "/join",
    element: <JoinSession />,
  },
  {
    path: "/createtaste",
    element: <CreateTaste />,
  },
  {
    path: "/profil",
    element: <CreateTaste />,
  },
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
