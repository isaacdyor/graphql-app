import Layout from "./pages/Layout";
import HomePage from "./pages/Home";
import AboutPage from './pages/About';
import ErrorPage from "./pages/ErrorPage";

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" errorElement={<ErrorPage />} element={<Layout />} >
      <Route index path="home" element={<HomePage />} />
      <Route path="about/:id" element={<AboutPage />} />
    </Route>
  )
);

function App(): JSX.Element {

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  )
}

export default App