import "./App.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";
import Feed from "./Components/Feed";
import Login from "./Components/Login";
import PrivateRoute from "./Components/PrivateRoute";
import Profile from "./Components/Profile";
import Signup from "./Components/Signup";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route
            path="/"
            exact
            element={
              <PrivateRoute>
                <Feed />
              </PrivateRoute>
            }
          ></Route>
          <Route
            path="/profile/:id"
            exact
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          ></Route>

          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
