import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from "react-redux"
import { singleProductAction, updateProductAction } from "./../../store/actions/productAction"
import { useParams } from "react-router-dom"
import { Box, Button, Stack, TextField } from '@mui/material'
import { useFormik } from 'formik'
import * as yup from 'yup'

export default function EditProduct() {
    const dispatch = useDispatch()
    const { id } = useParams()
    const { singleProduct } = useSelector(state => state.products)
    useEffect(() => {
        dispatch(singleProductAction(id))
    }, [])



    const [image, setimage] = useState()
    const [preview, setpreview] = useState()
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            name: singleProduct?.name,
            price: singleProduct?.price,
            stock: singleProduct?.stock,
            desc: singleProduct?.desc,
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

            dispatch(updateProductAction(fd, id))

        }
    })
    const handleImage = e => {
        setpreview(URL.createObjectURL(e.target.files[0]))
        setimage(e.target.files[0])
    }

    return (
        <div>
            EditProduct
            {JSON.stringify(singleProduct)}

            {/* edit  */}
            <Box sx={{ maxWidth: "100%", margin: "10% 25%" }}>

                <Stack spacing={3}>
                    <form onSubmit={formik.handleSubmit}>
                        <TextField
                            error={formik?.errors?.name}
                            helperText={formik?.errors?.name}
                            value={formik.values.name ? formik.values.name : ""}
                            name='name'
                            onChange={formik.handleChange}
                            fullWidth
                            label='Product Name'
                            id='fullWidth' />
                        <br /> <br />
                        <TextField
                            error={formik?.errors?.price}
                            helperText={formik?.errors?.price}
                            value={formik.values.price ? formik.values.price : ""}
                            name='price'
                            onChange={formik.handleChange}
                            fullWidth
                            label='Product Price'
                            id='fullWidth' />
                        <br /> <br />
                        <TextField
                            error={formik?.errors?.stock}
                            helperText={formik?.errors?.stock}
                            value={formik.values.stock ? formik.values.stock : ""}
                            name='stock'
                            onChange={formik.handleChange}
                            fullWidth
                            label='Product Stock Quantity'
                            id='fullWidth' />
                        <br /> <br />
                        <TextField
                            error={formik?.errors?.desc}
                            helperText={formik?.errors?.desc}
                            value={formik.values.desc ? formik.values.desc : ""}
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
                        <Button fullWidth variant='contained' type='submit' color='success'>update Product</Button>
                    </form>
                </Stack>
            </Box>

            {/* edit end */}


        </div>
    )
}
