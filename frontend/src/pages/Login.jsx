import { Box, Button, Stack, TextField, Alert } from "@mui/material";
import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginAction } from "../store/actions/userAction";


export default function Login() {
  const dispatch = useDispatch();
  const { login, isLoading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [showAlert, setshowAlert] = React.useState(false);
  const { cartItem } = useSelector((state) => state.cart);
  React.useEffect(() => {
    if (login?.name) {
      cartItem.length > 0 ? navigate("/payment") : navigate("/");
    }
  }, [login]);

  const formik = useFormik({
    initialValues: {
      email: "admin@gmail.com",
      password: "123",
    },
    validationSchema: yup.object({
      email: yup.string().email("Invalid email").required("Email is required"),
      password: yup.string().required("Password is required"),
    }),
    onSubmit: async ({ email, password }, { resetForm }) => {
      dispatch(loginAction({ email, password }));
      resetForm();
    },
  });
  return (
    <>
      <Box sx={{ maxWidth: "100%", margin: "10% 25%" }}>
        {error && <Alert severity="error">{error}</Alert>}
        {showAlert && (
          <Alert severity="success">You have Login successfully</Alert>
        )}
        {isLoading && <h1>Connecting Securely</h1>}
        {JSON.stringify(formik.values)}
        {JSON.stringify(formik.errors)}
        <Stack spacing={3}>
          <form onSubmit={formik.handleSubmit}>
            <TextField
              error={formik?.errors?.email}
              helperText={formik?.errors?.email}
              value={formik.values.email}
              name="email"
              onChange={formik.handleChange}
              fullWidth
              label="Email"
              id="fullWidth"
            />
            <br />
            <TextField
              error={formik?.errors?.password}
              helperText={formik?.errors?.password}
              value={formik.values.password}
              name="password"
              onChange={formik.handleChange}
              fullWidth
              label="Password"
              id="fullWidth"
            />
            <Button fullWidth variant="contained" type="submit" color="success">
              Login
            </Button>
          </form>
          <Link to={"/forgetpassword"}>Forget Password?</Link>
        </Stack>
      </Box>
    </>
  );
}
