import { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login";
import Main from "./pages/Main";
import JoinSession from "./pages/JoinSession";
import NotFoundPage from "./otherPages/NotFoundPage";

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
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
