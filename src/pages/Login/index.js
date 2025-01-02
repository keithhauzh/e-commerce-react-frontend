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

// react imports
import React, { useState } from "react";

// component improts
import Header from "../../components/Header";

// sonner imports
import { toast } from "sonner";

// api imports
import { doLogin } from "../../utils/api_auth";

export default function Login() {
  // states for input fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //   button handler for the fields
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    // check for error
    if (!email || !password) {
      toast.error("Please fill out all the required fields");
    }
    const loginSuccessful = await doLogin(email, password);
    if (loginSuccessful) {
      toast.success("login test is successful");
    }
  };

  return (
    <>
      <Header />
      <Container component="main" maxWidth="xs">
        <CssBaseline />
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
                  fullWidth
                  value={password}
                  onChange={(event) => {
                    setPassword(event.target.value);
                  }}
                  label="Password"
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
              Login
            </Button>
          </Box>
        </Box>
        <Grid container justifyContent="flex-end">
          <Grid item>
            <Link href="/signup" variant="body2">
              Don't have an account? Signup here
            </Link>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
