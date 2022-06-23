import "./Posts.css";

import { Card, Dialog, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

import AddComment from "./AddComment";
import Avatar from "@mui/material/Avatar";
import ChatBubbleIcon from "@material-ui/icons/ChatBubble";
import CircularProgress from "@mui/material/CircularProgress";
import Comments from "./Comments";
import Like from "./Like";
import Like2 from "./Like2";
import Video from "./Video";
import { database } from "../firebase";

function Posts({ userData }) {
  const [posts, setPosts] = useState(null);
  const [open, setOpen] = useState(null);

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

  const handleClose = () => {
    setOpen(null);
  };

  const handleClickOpen = (id) => {
    setOpen(id);
  };
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
                <ChatBubbleIcon
                  className="chat-styling"
                  onClick={() => handleClickOpen(post.pId)}
                />
                <Dialog
                  open={open === post.pId}
                  onClose={handleClose}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                  fullWidth={true}
                  maxWidth="md"
                >
                  <div className="modal-container">
                    <div className="video-modal">
                      <video autoPlay={true} muted="muted" controls>
                        <source src={post.pUrl} />
                      </video>
                    </div>
                    <div className="comment-modal">
                      <Card className="card1" style={{ padding: "1rem" }}>
                        <Comments postData={post} />
                      </Card>
                      <Card variant="outlined" className="card2">
                        <Typography style={{ padding: "0.4rem" }}>
                          {post.likes.length === 0
                            ? "Liked by nobody"
                            : `Liked by ${post.likes.length} users`}
                        </Typography>
                        <div style={{ display: "flex" }}>
                          <Like2
                            postData={post}
                            userData={userData}
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          />
                          <AddComment
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                            userData={userData}
                            postData={post}
                          />
                        </div>
                      </Card>
                    </div>
                  </div>
                </Dialog>
              </div>
            </React.Fragment>
          ))}
        </div>
      )}
    </div>
  );
}

export default Posts;
