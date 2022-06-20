import "./Posts.css";

import React, { useEffect, useState } from "react";

import Avatar from "@mui/material/Avatar";
import CircularProgress from "@mui/material/CircularProgress";
import Like from "./Like";
import Video from "./Video";
import { database } from "../firebase";

function Posts({ userData }) {
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    let parr = [];
    const unSub = database.posts
      .orderBy("createdAt", "desc")
      .onSnapshot((querySnapshot) => {
        parr = [];
        querySnapshot.forEach((doc) => {
          let data = { ...doc.data(), postId: doc.id };
          parr.push(data);
        });
        setPosts(parr);
      });

    return unSub;
  }, []);

  return (
    <div>
      {posts == null || userData == null ? (
        <CircularProgress />
      ) : (
        <div className="video-container">
          {posts.map((post, index) => (
            <React.Fragment key={index}>
              {console.log(post)}
              <div className="videos">
                <Video src={post.pUrl} id={post.pId} />
                <div className="fa" style={{ display: "flex" }}>
                  <Avatar src={post.uProfile} />
                  <h4>{post.uName}</h4>
                </div>
                <Like userData={userData} postData={post} />
              </div>
            </React.Fragment>
          ))}
        </div>
      )}
    </div>
  );
}

export default Posts;
