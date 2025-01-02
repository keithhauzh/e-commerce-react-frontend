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

// sonner imports
import { toast } from "sonner";

// api imports
import { doSignup } from "../../utils/api_auth";

// component improts
import Header from "../../components/Header";

export default function Signup() {
  //  states for input fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    // check for error
    if (!name || !email || !password) {
      toast.error("Please fill out all the required fields");
    }
    const signupSuccessful = await doSignup(name, email, password);
    if (signupSuccessful) {
      toast.success("signup test is successful");
    }
  };

  return (
    <>
      <Header />
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
