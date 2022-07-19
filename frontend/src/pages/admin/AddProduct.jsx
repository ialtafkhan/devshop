import { Box, Button, Stack, TextField } from '@mui/material'
import React, { useState } from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'
import axios from "axios"
import { useSelector, useDispatch } from "react-redux"
import { addProductAction } from '../../store/actions/productAction'
import { useNavigate } from 'react-router-dom'


export default function AddProduct() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [image, setimage] = useState()
    const [preview, setpreview] = useState()
    const formik = useFormik({
        initialValues: {
            name: "Dell XPS Pro",
            price: "99900",
            stock: "5",
            desc: "This Is Awesome Product",
        },
        validationSchema: yup.object({
            name: yup.string().required("This field can not be empty"),
            price: yup.number().required("This field can not be empty"),
            stock: yup.number().required("This field can not be empty"),
            desc: yup.string().required("This field can not be empty"),
        }),
        onSubmit: async (
            { name, price, stock, desc }, { resetForm }
        ) => {

            let fd = new FormData()
            fd.append("name", name)
            fd.append("price", price)
            fd.append("stock", stock)
            fd.append("desc", desc)
            fd.append("image", image)


            dispatch(addProductAction(fd))
            // const { data } = await axios.post(`/product`, fd, {
            //     headers: {
            //         "Content-Type": "multipart/form-data"
            //     }
            // })
            // resetForm()
        }
    })
    const handleImage = e => {
        setpreview(URL.createObjectURL(e.target.files[0]))
        setimage(e.target.files[0])
    }
    return (
        <Box sx={{ maxWidth: "100%", margin: "10% 25%" }}>

            <Stack spacing={3}>
                <form onSubmit={formik.handleSubmit}>
                    <TextField
                        error={formik?.errors?.name}
                        helperText={formik?.errors?.name}
                        value={formik.values.name}
                        name='name'
                        onChange={formik.handleChange}
                        fullWidth
                        label='Product Name'
                        id='fullWidth' />
                    <br /> <br />
                    <TextField
                        error={formik?.errors?.price}
                        helperText={formik?.errors?.price}
                        value={formik.values.price}
                        name='price'
                        onChange={formik.handleChange}
                        fullWidth
                        label='Product Price'
                        id='fullWidth' />
                    <br /> <br />
                    <TextField
                        error={formik?.errors?.stock}
                        helperText={formik?.errors?.stock}
                        value={formik.values.stock}
                        name='stock'
                        onChange={formik.handleChange}
                        fullWidth
                        label='Product Stock Quantity'
                        id='fullWidth' />
                    <br /> <br />
                    <TextField
                        error={formik?.errors?.desc}
                        helperText={formik?.errors?.desc}
                        value={formik.values.desc}
                        name='desc'
                        onChange={formik.handleChange}
                        fullWidth
                        label='Product Description'
                        id='fullWidth' />
                    <br /> <br />
                    <Button
                        variant="contained"
                        component="label">
                        Upload File
                        <input
                            type="file"
                            hidden
                            onChange={handleImage}
                        />
                    </Button>
                    <img src={preview} alt="" height={100} />
                    <br /> <br />
                    <Button
                        fullWidth variant='contained'
                        type='submit'
                        color='success'

                    >Add Product</Button>
                </form>
            </Stack>
        </Box>
    )
}