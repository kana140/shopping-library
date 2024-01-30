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
// import { Link, useNavigate } from "react-router-dom";
// import { useState } from "react";

export const Product = ({ product }) => {
  return (
    <a
      href={product.href}
      target="_blank"
      rel="noreferrer"
      style={{ textDecoration: "none" }}
    >
      <Card sx={{ bgcolor: "#F4F4F4" }}>
        <CardMedia
          sx={{ height: 140 }}
          image={product.img}
          title="green iguana"
        />
        <CardContent>
          <Typography gutterBottom marginTop={2}>
            {product.title}
          </Typography>
          <Typography gutterBottom marginTop={2}>
            {product.price}
          </Typography>
        </CardContent>
      </Card>
    </a>
  );
};
