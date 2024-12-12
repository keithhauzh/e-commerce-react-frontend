import React from "react";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
  Stack,
  Chip,
  Paper,
} from "@mui/material";
import { red } from "@mui/material/colors";
import Grid from "@mui/material/Grid2";

export default function ProductGrid(props) {
  const { list } = props;

  // Color for chip
  const redColor = red[700];

  const cardHeight = 250;

  return (
    <Grid container spacing={2} sx={{ width: "100%" }}>
      {list.map((item) => (
        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 4 }}>
          <Card
            variant="outlined"
            sx={{
              height: cardHeight,
              display: "flex",
              flexDirection: "column",
              width: "100%",
            }}
          >
            <CardContent
              sx={{
                height: "50%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <Typography
                variant="h5"
                component="div"
                sx={{ fontWeight: "bold" }}
              >
                {item.name}
              </Typography>
              <Stack
                direction="row"
                spacing={1}
                sx={{ justifyContent: "space-between" }}
                mt={1}
              >
                <Chip label={`$${item.price}`} color="success" />
                <Chip
                  label={item.category}
                  sx={{ backgroundColor: redColor, color: "white" }}
                />
              </Stack>
            </CardContent>
            <CardActions
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                height: "50%",
              }}
            >
              <Box
                sx={{
                  width: "100%",
                  backgroundColor: "white",
                  fontWeight: "bold",
                }}
              >
                <Button sx={{ width: "100%" }} variant="contained">
                  Add to Cart
                </Button>
              </Box>
              <Stack
                direction="row"
                spacing={1}
                sx={{ justifyContent: "space-between", width: "100%", mx: 1 }}
              >
                <Chip label="Edit" color="success" />
                <Chip
                  label="Delete"
                  sx={{ backgroundColor: redColor, color: "white" }}
                />
              </Stack>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
