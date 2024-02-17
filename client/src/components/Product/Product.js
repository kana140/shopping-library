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

export const Product = ({ product }) => {
  return (
    <a
      href={product.href}
      target="_blank"
      rel="noreferrer"
      style={{ textDecoration: "none" }}
    >
      <Card className="product">
        <CardMedia
          sx={{ height: 140 }}
          image={product.img}
          title={product.title}
          className="product-image"
        />
        <CardContent className="product-content">
          <Typography gutterBottom marginTop={2}>
            {product.title}
          </Typography>
          <Typography gutterBottom marginTop={2}>
            {/* ${product.price.replace(/[^\d.]/g, "")} */ product.price}
          </Typography>
        </CardContent>
      </Card>
    </a>
  );
};
