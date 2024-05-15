import { Route, Routes } from "react-router-dom";
import Home from "@/pages/Home";
import SignUp from "@/features/auth/SignUp";
import SignIn from "@/features/auth/SignIn";
import Profile from "@/pages/Profile";
import PriviteRoutes from "@/features/auth/PriviteRoutes";
import NotFound from "@/pages/NotFound";

import EditProfile from "@/pages/Settings/components/EditProfile";
import Settings from "@/pages/Settings";
import axios from "axios";
import AuthRoutes from "./features/auth/AuthRoutes";

function App() {
  axios.defaults.baseURL = "http://localhost:3000/api";
  axios.defaults.withCredentials = true;

  return (
    <Routes>
      <Route element={<AuthRoutes />}>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
      </Route>
      <Route element={<PriviteRoutes />}>
        <Route index path="/" element={<Home />} />
        <Route path="/search" element={<NotFound />} />
        <Route path="/explore" element={<Home />} />
        <Route path="/reels" element={<Home />} />
        <Route path="/messages" element={<NotFound />} />
        <Route path="/notifications" element={<NotFound />} />
        <Route path="/newpost" element={<NotFound />} />
        <Route element={<Settings />}>
          <Route path="/settings/edit" element={<EditProfile />} />
        </Route>
        <Route path="/:username" element={<Profile />} />
      </Route>
      <Route errorElement path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
