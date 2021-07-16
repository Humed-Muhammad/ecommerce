import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useSelector, useDispatch } from "react-redux";
import { getUserRegisterData } from "../../redux/slice/users";
import { addUser } from "../../api";
import CountrySelector from "./CountrySelector.jsx";
import DatePicker from "./DatePicker.jsx";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(20),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp() {
  let [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    password: "",
    email: "",
    phone: "",
    country: "",
    birthDate: "",
  });

  let [response, setResponse] = useState({ status: "", message: "" });

  const classes = useStyles();
  let dispatch = useDispatch();
  let { users } = useSelector((state) => state.users);
  console.log(users);
  const handleSubmit = async (e) => {
    e.preventDefault();
    let { status, message } = await addUser(users);
    setResponse({ status, message });
  };
  console.log(response);

  return (
    <Container className={classes.paper} component="main">
      <CssBaseline />
      <div className="w-full sm:w-3/5 flex flex-col justify-center items-center bg-white py-3 px-5">
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form
          onSubmit={(e) => handleSubmit(e)}
          className={classes.form}
          noValidate
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                onChange={(e) =>
                  setUserData({ ...userData, firstName: e.target.value })
                }
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
              />
              <p className="text-red-500">
                {response.status ? "" : response.message["firstname"]}
              </p>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                onChange={(e) =>
                  setUserData({ ...userData, lastName: e.target.value })
                }
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
              />
              <p className="text-red-500">
                {response.status ? "" : response.message["lastname"]}
              </p>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                onChange={(e) =>
                  setUserData({ ...userData, email: e.target.value })
                }
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
              <p className="text-red-500">
                {response.status ? "" : response.message["email"]}
              </p>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                onChange={(e) =>
                  setUserData({ ...userData, password: e.target.value })
                }
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <p className="text-red-500">
                {response.status ? "" : response.message["password"]}
              </p>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                onChange={(e) =>
                  setUserData({ ...userData, phone: e.target.value })
                }
                variant="outlined"
                required
                fullWidth
                name="number"
                label="Mobile Number"
                type="tel"
                id="phone"
                autoComplete="current-phone"
              />
              <p className="text-red-500">
                {response.status ? "" : response.message["phone"]}
              </p>
            </Grid>
            <Grid item xs={12} sm={6}>
              <CountrySelector userData={userData} setUserData={setUserData} />
              <p className="text-red-500">
                {response.status ? "" : response.message["country"]}
              </p>
            </Grid>
            <Grid item xs={12} sm={6}>
              <DatePicker userData={userData} setUserData={setUserData} />
              <p className="text-red-500">
                {response.status ? "" : response.message["birthDate"]}
              </p>
            </Grid>
          </Grid>
          <Button
            onClick={() => {
              dispatch(getUserRegisterData({ ...userData }));
            }}
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link to="/login">Already have an account? Sign in</Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
