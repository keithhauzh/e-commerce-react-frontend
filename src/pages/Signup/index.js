// mui imports
import {
  Button,
  CssBaseline,
  TextField,
  Link,
  Box,
  Container,
} from "@mui/material";
import Grid from "@mui/material/Grid2";

// react-router-dom imports
import { useNavigate } from "react-router-dom";

// react imports
import React, { useState } from "react";

// sonner imports
import { toast } from "sonner";

// api imports
import { doSignup } from "../../utils/api_auth";

// component improts
import Header from "../../components/Header";

// import useCookies
import { useCookies } from "react-cookie";

export default function Signup() {
  // useNavigate
  const navigate = useNavigate();

  // useCookies for cookies
  const [cookie, setCookie] = useCookies(["currentUser"]);

  //  states for input fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    // check for error
    if (!name || !email || !password || !confirmPassword) {
      toast.error("Please fill out all the required fields");
    }

    // check if both password fields are the same
    if (password !== confirmPassword) {
      toast.error("Please make sure both password fields are the same");
    } else {
      const userData = await doSignup(name, email, password);
      if (userData) {
        toast.success("You have successfully logged in. Happy Shopping!");
        setCookie("currentUser", userData, { maxAge: 60 * 60 * 24 * 30 }); // seconds, minutes, hours, days
        // redirect user to home
        navigate("/");
      }
    }
  };

  return (
    <>
      <Header title="Signup" />
      <Container component="main" maxWidth="xs">
        <CssBaseline />{" "}
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            // for border
            border: "1px solid #ccc",
            borderRadius: "8px",
            padding: 4,
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
            backgroundColor: "#fff",
          }}
        >
          <Box component="form" sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} sx={{ display: "flex", width: "100%" }}>
                <TextField
                  fullWidth
                  label="Name"
                  value={name}
                  onChange={(event) => {
                    setName(event.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={12} sx={{ display: "flex", width: "100%" }}>
                <TextField
                  required
                  fullWidth
                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value);
                  }}
                  label="Email Address"
                />
              </Grid>
              <Grid item xs={12} sx={{ display: "flex", width: "100%" }}>
                <TextField
                  required
                  fullWidth
                  value={password}
                  onChange={(event) => {
                    setPassword(event.target.value);
                  }}
                  label="Password"
                  type="password"
                />
              </Grid>
              <Grid item xs={12} sx={{ display: "flex", width: "100%" }}>
                <TextField
                  required
                  fullWidth
                  value={confirmPassword}
                  onChange={(event) => {
                    setConfirmPassword(event.target.value);
                  }}
                  label="Confirm Password"
                  type="password"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleFormSubmit}
            >
              Signup
            </Button>
          </Box>
        </Box>
        <Grid container justifyContent="flex-end">
          <Grid item>
            <Link href="/login" variant="body2">
              Already have an account? Login here
            </Link>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
