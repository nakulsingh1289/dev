import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/styles";
import "./Signup.css";
import instaImg from "../Assets/Instagram.JPG";
import { Alert, TextField } from "@mui/material";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import { Link } from "react-router-dom";

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
            {true ? (
              <Alert severity="error">
                This is an error alert — check it out!
              </Alert>
            ) : (
              <></>
            )}
            <TextField
              id="outlined-basic"
              label="Email"
              variant="outlined"
              fullWidth={true}
              margin="dense"
              size="small"
            />
            <TextField
              id="outlined-basic"
              label="Password"
              variant="outlined"
              fullWidth={true}
              margin="dense"
              size="small"
            />
            <TextField
              id="outlined-basic"
              label="Full Name"
              variant="outlined"
              fullWidth={true}
              margin="dense"
              size="small"
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
              <input type="file" accept="imag/*" hidden={true}></input>
            </Button>
          </CardContent>
          <CardActions>
            <Button color="primary" variant="contained" fullWidth={true}>
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
