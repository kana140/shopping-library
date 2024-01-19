import "./Product.css";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  colors,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export const Product = ({ idkyet }) => {
  return (
    <Card sx={{ borderRadius: "20px", bgcolor: "#F4F4F4" }}>
      <CardContent>
        <Typography gutterBottom variant="h4" component="div" marginTop={2}>
          product name
        </Typography>
      </CardContent>

      <CardActions style={{ justifyContent: "center" }}>
        <Button
          variant="outlined"
          color="secondary"
          style={{
            borderRadius: "10px",
            textTransform: "none",
            backgroundColor: "white",
          }}
        >
          button
        </Button>
      </CardActions>
    </Card>
  );
};
