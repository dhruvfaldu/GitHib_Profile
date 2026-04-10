import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Home from "../pages/Home"
import Profile from "../pages/Profile"
import Repos from "../pages/Repos"
import Followers from "../pages/Followers"
import Stats from "../pages/Stats"
import NotFound from "../pages/NotFound"
import Layout from "../Layout"

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/user/:username" element={<Profile />}>
            <Route index element={<Navigate to="repos" replace />} /> // Redirect to repos as default
            <Route path="repos" element={<Repos />} />
            <Route path="followers" element={<Followers />} />
            <Route path="stats" element={<Stats />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes