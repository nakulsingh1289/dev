import React, { useContext } from "react";

import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

// https://dev.to/iamandrewluca/private-route-in-react-router-v6-lg5 check this for private route implementation
function PrivateRoute({ children }) {
  console.log(children);
  const { user } = useContext(AuthContext);
  return user ? children : <Navigate to="/login" />;
}

export default PrivateRoute;
