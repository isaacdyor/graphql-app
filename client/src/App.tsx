import Layout from "./pages/Layout";
import HomePage from "./pages/Home";
import AboutPage from './pages/About';
import ErrorPage from "./pages/ErrorPage";
import PostsPage from "./pages/Posts";
import PostDetailPage from "./pages/PostDetail";
import ProfilePage from "./pages/ProfilePage";
import CreatePost from "./pages/CreatePost";

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
      <Route path="posts" element={<PostsPage />} />
      <Route path="posts/:id" element={<PostDetailPage />} />
      <Route path="users/:id" element={<ProfilePage />} />
      <Route path="createpost" element={<CreatePost />} />
    </Route>
  )
);

function App(): JSX.Element {

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  )
}

export default App