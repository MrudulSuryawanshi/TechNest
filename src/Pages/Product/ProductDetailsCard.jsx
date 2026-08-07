import React from "react";
import { useContext } from "react";
import { SnackbarContext } from "../../Context/SnackbarContext";
import { useCart } from "../../Context/CartContext";
import {
  Container,
  Paper,
  Grid,
  Box,
  CardMedia,
  Typography,
  Button,
} from "@mui/material";

const ProductDetailsCard = ({ product }) => {
  const { cart, addToCart } = useCart();

  const cartItem = cart.find((item) => item.id === product.id);
  const isMaxStockReached = cartItem && cartItem.quantity >= product.stock;

  const { showSnackbar } = useContext(SnackbarContext);

  const handleAddToCart = () => {
    addToCart(product);
    showSnackbar(`${product.name} added to cart`, "success");
  };

  return (
    <Container
      maxWidth="lg"
      sx={{
        mt: 4,
        mb: 4,
      }}
    >
      <Paper
        elevation={4}
        sx={{
          p: { xs: 2, sm: 3, md: 4 },
          borderRadius: 3,
        }}
      >
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
              }}
            >
              <CardMedia
                component="img"
                image={product.image}
                alt={product.name}
                sx={{
                  width: "100%",
                  maxWidth: { xs: 180, sm: 270, md: 300 },
                  height: { xs: 180, sm: 250, md: 250 },
                  objectFit: "contain",
                  mx: "auto",
                }}
              />{" "}
            </Box>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 1,
                }}
              >
                <Typography variant="h4" fontWeight="bold">
                  {product.name}
                </Typography>

                <Typography variant="body1">
                  <strong>Brand:</strong> {product.brand}
                </Typography>

                <Typography variant="body1">
                  <strong>Category:</strong> {product.category}
                </Typography>

                <Typography variant="h5" color="primary" fontWeight="bold">
                  ₹{product.price}
                </Typography>

                {product.stock > 0 ? (
                  <Typography
                    variant="body1"
                    sx={{
                      color: "green",
                      fontWeight: "bold",
                    }}
                  >
                    In Stock - {product.stock} available
                  </Typography>
                ) : (
                  <Typography
                    variant="body1"
                    sx={{
                      color: "red",
                      fontWeight: "bold",
                    }}
                  >
                    Out of Stock
                  </Typography>
                )}

                <Box
                  sx={{
                    display: "flex",
                    gap: 2,
                    mt: 2,
                    flexDirection: { xs: "column", sm: "row" },
                  }}
                >
                  <Button
                    variant="contained"
                    fullWidth
                    disabled={product.stock === 0 || isMaxStockReached}
                    onClick={handleAddToCart}
                  >
                    {product.stock === 0
                      ? "Out of Stock"
                      : isMaxStockReached
                        ? "Maximum Stock Reached"
                        : "Add to Cart"}
                  </Button>

                  <Button
                    variant="outlined"
                    disabled={product.stock === 0}
                    fullWidth
                  >
                    Buy Now
                  </Button>
                </Box>

                <Typography variant="body1" color="text.secondary">
                  {product.description}
                </Typography>

                <Typography variant="h6" sx={{ mt: 1 }}>
                  Specifications
                </Typography>

                {Object.entries(product.specifications).map(([key, value]) => (
                  <Typography key={key} variant="body2">
                    <strong>{key}:</strong> {value}
                  </Typography>
                ))}
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default ProductDetailsCard;
