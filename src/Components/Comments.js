import React, { useEffect, useState } from "react";

import Avatar from "@mui/material/Avatar";
import CircularProgress from "@mui/material/CircularProgress";
import { database } from "../firebase";

function Comments({ postData }) {
  const [comments, setComments] = useState(null);
  useEffect(() => {
    async function fetchComments() {
      let arr = [];
      for (let i = 0; i < postData.comments.length; i++) {
        let data = await database.comments.doc(postData.comments[i]).get();
        arr.push(data.data());
      }
      setComments(arr);
    }
    fetchComments();
  }, [postData]);
  return (
    <div>
      {comments == null ? (
        <CircularProgress />
      ) : (
        <>
          {comments.map((comment, index) => (
            <div style={{ display: "flex" }} key={index}>
              <Avatar src={comment.uProfileImage} />
              <p>
                &nbsp;&nbsp;
                <span style={{ fontWeight: "bold" }}>{comment.uName}</span>
                &nbsp;&nbsp; {comment.text}
              </p>
            </div>
          ))}
        </>
      )}
    </div>
  );
}

export default Comments;
