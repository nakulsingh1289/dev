import React, { useContext, useEffect, useState } from "react";

import { AuthContext } from "../context/AuthContext";
import Posts from "./Posts";
import UploadFile from "./UploadFile";
import { database } from "../firebase";

export default function Feed() {
  const { user, logout } = useContext(AuthContext);
  const [userData, setUserData] = useState({});
  useEffect(() => {
    const unSub = database.users.doc(user.uid).onSnapshot((snapshot) => {
      setUserData(snapshot.data());
    });
    return () => {
      unSub();
    };
  }, [user]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <h1>Feed Component</h1>
      <button onClick={logout}>Logout</button>
      <UploadFile user={userData} />
      <Posts userData={userData} />
    </div>
  );
}
