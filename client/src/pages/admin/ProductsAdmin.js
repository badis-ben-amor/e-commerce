import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllProductsAdminThunk,
  createProductAdminThunk,
  updateProductAdminThunk,
  deleteProductAdminThunk,
} from "../../redux/slices/admin/productsAdminSlice";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { Add, Delete, Edit } from "@mui/icons-material";
import { getToken } from "../../services/tokenServices";

const ProductsAdmin = () => {
  const dispatch = useDispatch();

  const [products, setProducts] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogMode, setDialogMode] = useState("add");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [formValues, setFormValues] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    image: null,
  });

  const { products: productsData, isLoading } = useSelector(
    (state) => state.adminProduct
  );
  // const { accessToken } = useSelector((state) => state.auth);
  const accessToken = getToken();

  useEffect(() => {
    dispatch(getAllProductsAdminThunk(accessToken));
  }, [dispatch]);

  useEffect(() => {
    setProducts(productsData);
  }, [productsData]);

  const handleOpenDialog = (mode, product = null) => {
    setDialogMode(mode);
    setSelectedProduct(product);
    setFormValues(
      product
        ? {
            name: product.name,
            description: product.description,
            price: product.price,
            stock: product.stock,
            image: null,
          }
        : {
            name: "",
            description: "",
            price: "",
            stock: "",
            image: null,
          }
    );
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setSelectedProduct(null);
    setOpenDialog(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormValues({ ...formValues, image: e.target.files[0] });
  };

  const handleFormSubmit = () => {
    const formData = new FormData();
    formData.append("name", formValues.name);
    formData.append("description", formValues.description);
    formData.append("price", parseFloat(formValues.price));
    formData.append("stock", parseFloat(formValues.stock));
    if (formValues.image) {
      formData.append("image", formValues.image);
    }

    if (dialogMode === "add") {
      dispatch(createProductAdminThunk({ formData, accessToken })).then(() =>
        dispatch(getAllProductsAdminThunk(accessToken))
      );
    } else if (dialogMode === "edit" && selectedProduct) {
      dispatch(
        updateProductAdminThunk({
          productId: selectedProduct._id,
          formData,
          accessToken,
        })
      ).then(() => dispatch(getAllProductsAdminThunk(accessToken)));
    }
    handleCloseDialog();
  };

  const handleDeleteProduct = (productId) => {
    dispatch(deleteProductAdminThunk({ productId, accessToken })).then(() =>
      dispatch(getAllProductsAdminThunk(accessToken))
    );
  };

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Admin - Product Management
      </Typography>

      <Button
        variant="contained"
        startIcon={<Add />}
        onClick={() => handleOpenDialog("add")}
        sx={{ mb: 3 }}
      >
        Add Product
      </Button>

      <Grid container spacing={2}>
        {products?.map((product) => (
          <Grid item key={product._id} xs={12} md={6} lg={4}>
            <Paper elevation={3} sx={{ p: 2 }}>
              <Typography variant="h6">{product.name}</Typography>
              <Typography variant="body2">{product.description}</Typography>
              <Typography variant="subtitle1">
                Price: ${product.price.toFixed(2)}
              </Typography>
              <Typography variant="subtitle1">
                Stock:{" "}
                {product.stock > 0 ? (
                  product.stock
                ) : (
                  <span style={{ color: "red" }}>Out of stock</span>
                )}
              </Typography>
              {product.image && (
                <Box mt={2}>
                  <img
                    src={`${process.env.REACT_APP_API_KEY}/uploads/${product.image}`}
                    alt={product.name}
                    style={{
                      width: "100px",
                      maxHeight: "200px",
                      objectFit: "cover",
                    }}
                  />
                </Box>
              )}
              <Box mt={2} display={"flex"} justifyContent={"space-between"}>
                <IconButton
                  color="primary"
                  onClick={() => handleOpenDialog("edit", product)}
                >
                  <Edit />
                </IconButton>
                <IconButton
                  color="error"
                  onClick={() => handleDeleteProduct(product._id)}
                >
                  <Delete />
                </IconButton>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>
          {dialogMode === "add" ? "Add Product" : "Edit Product"}
        </DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            name="name"
            label="Name"
            type="text"
            fullWidth
            variant="outlined"
            value={formValues.name}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="description"
            label="Description"
            type="text"
            fullWidth
            multiline
            rows={3}
            variant="outlined"
            value={formValues.description}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="price"
            label="Price"
            type="number"
            fullWidth
            variant="outlined"
            value={formValues.price}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="stock"
            label="Stock"
            type="number"
            fullWidth
            variant="outlined"
            value={formValues.stock}
            onChange={handleInputChange}
          />
          <Button variant="contained" component="label" sx={{ mt: 2 }}>
            Upload Image
            <input type="file" hidden onChange={handleFileChange} />
          </Button>
          {formValues.image && (
            <Box>
              <img
                src={URL.createObjectURL(formValues.image)}
                alt="preview"
                style={{
                  width: "100px",
                  height: "100px",
                  objectFit: "cover",
                  margin: "8px",
                }}
              />
              <Typography variant="caption" display="block" sx={{ ml: 1 }}>
                {formValues.image.name}
              </Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleFormSubmit} variant="contained">
            {dialogMode === "add" ? "Add" : "Update"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ProductsAdmin;
