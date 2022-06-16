import React, { useContext } from "react";

import { AuthContext } from "../context/AuthContext";

export default function Feed() {
  const { logout } = useContext(AuthContext);
  return (
    <div>
      <h1>Feed Component</h1>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
