import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { TextField } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import { forgetPasswordAction, getLoginAction } from "../store/actions/userAction";
import { useDispatch } from "react-redux";


export default function ForgetPassword() {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      email: "altafpathan439@gmail.com",
    },

    validationSchema: yup.object({
      email: yup.string().email("Invalid email").required("Email is required"),
    }),

    onSubmit: async (email, { resetForm }) => {
      dispatch(forgetPasswordAction(email));
      resetForm();
    },
  
  });
  return (
    <Box
      sx={{
        maxWidth: "100%",
        margin: "10% 25%",
        border: 1,
        p: 5,
        backgroundColor: "#eeeeee",
      }}
    >
      <form onSubmit={formik.handleSubmit}>
        <Typography variant="h4" component="div">
          Truble with logging in?
        </Typography>

        <br />
        <Typography variant="body1">
          Enter your Email address we'll sent you a reset link to get back into your
          account
        </Typography>

        <br />
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
        <br />

        <Button fullWidth variant="contained" type="submit" color="success">
          Reset
        </Button>
      </form>
    </Box>
  );
}
