import "./Signup.css";

import * as React from "react";

import { Alert, TextField } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { database, storage } from "../firebase";
import { useContext, useState } from "react";

import { AuthContext } from "../context/AuthContext";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import Typography from "@mui/material/Typography";
import instaImg from "../Assets/Instagram.JPG";
import { makeStyles } from "@mui/styles";

export default function Signup() {
  const useStyles = makeStyles({
    text1: {
      color: "grey",
      textAlign: "center",
    },
    card2: {
      height: "5vh",
      marginTop: "2%",
    },
  });

  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigator = useNavigate();
  const { signup } = useContext(AuthContext);

  const handleClick = async () => {
    if (file === null) {
      setError("Please upload profile image first");
      setTimeout(() => {
        setError("");
      }, 3000);
    }

    try {
      setError("");
      setLoading(true);
      let userObj = await signup(email, password);
      let uid = userObj.user.uid;
      const uploadTask = storage.ref(`/users/${uid}/ProfileImage`).put(file);
      uploadTask.on("state_changed", fn1, fn2, fn3);
      function fn1(snapshot) {
        let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(`Upload is ${progress} done.`);
      }
      function fn2(error) {
        setError(error);
        setTimeout(() => {
          setError("");
        }, 2000);
        setLoading(false);
        return;
      }
      function fn3() {
        uploadTask.snapshot.ref.getDownloadURL().then((url) => {
          database.users.doc(uid).set({
            email: email,
            userId: uid,
            fullName: name,
            profileUrl: url,
            createdAt: database.getTimeStamp(),
          });
        });
        setLoading(false);
        navigator("/", { replace: true });
      }
    } catch (err) {
      setError(err);
      setTimeout(() => {
        setError("");
      }, 2000);
    }
    setLoading(false);
  };

  return (
    <div className="signupWrapper">
      <div className="signupCard">
        <Card variant="outlined">
          <div className="insta-logo">
            <img src={instaImg} className="insta-logo-img" alt=""></img>
          </div>
          <CardContent>
            <Typography
              className={classes.text1}
              variant="subtitle1"
              component="div"
            >
              Sign up to see photos and videos from your friends
            </Typography>
            {error !== "" ? <Alert severity="error">{error}</Alert> : <></>}
            <TextField
              id="outlined-basic"
              label="Email"
              variant="outlined"
              fullWidth={true}
              margin="dense"
              size="small"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            <TextField
              id="outlined-basic"
              label="Password"
              variant="outlined"
              fullWidth={true}
              margin="dense"
              size="small"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            <TextField
              id="outlined-basic"
              label="Full Name"
              variant="outlined"
              fullWidth={true}
              margin="dense"
              size="small"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
            <Button
              size="small"
              fullWidth={true}
              variant="outlined"
              margin="dense"
              startIcon={<CloudUploadIcon />}
              color="secondary"
              component="label"
            >
              Upload Profile Image
              <input
                type="file"
                accept="imag/*"
                hidden={true}
                onChange={(file) => {
                  setFile(file.target.files[0]);
                }}
              ></input>
            </Button>
          </CardContent>
          <CardActions>
            <Button
              color="primary"
              variant="contained"
              fullWidth={true}
              disabled={loading}
              onClick={handleClick}
            >
              Sign Up
            </Button>
          </CardActions>
          <CardContent>
            <Typography className={classes.text1} variant="subtitle1">
              By Signin up, you agree to the Terms, Conditions and Cookies
              policy
            </Typography>
          </CardContent>
        </Card>
        <Card variant="outlined" className={classes.card2}>
          <Typography className={classes.text1} variant="subtitle1">
            Having and account?{" "}
            <Link to="/login" style={{ textDecoration: "none" }}>
              Login
            </Link>
          </Typography>
        </Card>
      </div>
    </div>
  );
}
