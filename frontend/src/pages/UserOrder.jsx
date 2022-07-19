import React from 'react'
import { Button, imageListItemClasses, Modal, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import Paper from "@mui/material/Paper";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getMyOrderAction } from '../store/actions/orderAction';
import { format } from "date-fns"
import { Box } from '@mui/system';
import CloseIcon from '@mui/icons-material/Close';

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    height: 500,
    bgcolor: "#fff",
    border: "2px solid #000",
    boxShadow: 24,
    overflow: "hidden",
    p: 4,
};

export default function UserOrder() {
    const dispatch = useDispatch();
    const { orders } = useSelector((state) => state.order);

    const [open, setopen] = useState(false)
    const [orderId, setorderId] = useState()
    const [detailsId, setdetailsId] = useState()



    const handleOpen = () => setopen(true);
    const handleClose = () => setopen(false);
    // console.log(myOrders);

    useEffect(() => {
        dispatch(getMyOrderAction())
    }, [])

    return (
        <>
            {
                orders?.length == 0
                    ? <h1>oppss thres is no product in cart....</h1>
                    : <>

                        <TableContainer component={Paper} >
                            {/* {JSON.stringify(myOrders)} */}
                            <Table style={{ overflow: "hidden" }} >
                                <TableHead style={{ backgroundColor: "lightblue" }} >
                                    <TableRow>
                                        <TableCell>Sr no</TableCell>
                                        <TableCell>Date</TableCell>
                                        <TableCell>Mode</TableCell>
                                        <TableCell>Status</TableCell>
                                        <TableCell>Products</TableCell>
                                        <TableCell>Action</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        orders?.map((item, index) => (
                                            <>
                                                <TableRow>
                                                    <TableCell>{index + 1}</TableCell>
                                                    <TableCell>{format(new Date(item?.createdAt), "dd MMM yyyy")}</TableCell>
                                                    <TableCell>{item?.mode}</TableCell>
                                                    <TableCell>{item?.status}</TableCell>

                                                    <TableCell>
                                                        <ol>
                                                            {item?.products?.map((single) => (
                                                                <>
                                                                    <li>{single?.productId?.name}</li>
                                                                </>
                                                            ))}
                                                        </ol>
                                                    </TableCell>

                                                    <TableCell>

                                                        <Button

                                                            onClick={(e) => {
                                                                handleOpen();
                                                                setorderId(item?._id)
                                                                setdetailsId(index)

                                                            }}

                                                        >

                                                            Details
                                                        </Button>
                                                    </TableCell>

                                                </TableRow>
                                            </>
                                        ))
                                    }
                                </TableBody>

                            </Table>
                        </TableContainer>


                        {/* model for userdata */}

                        <Modal
                            sx={{
                                width: "60%",
                                position: "absolute",
                                top: "15%",
                                left: "20%",
                            }}
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"

                        >
                            <Box sx={style} >
                                <Button onClick={() => {
                                    handleClose()
                                }} >
                                    <CloseIcon color='error' sx={{ marginLeft: "490px" }}
                                    />
                                </Button>
                                <Typography id="modal-modal-title" variant="h6" component="h2">
                                    Order Details
                                </Typography>
                                <Typography>

                                    name: {orders[detailsId]?.userId?.name}
                                    <br />
                                    status: {orders[detailsId]?.status}
                                    <br />
                                    payment:{orders[detailsId]?.mode}orders
                                    <br />
                                    <ol>
                                        {
                                            orders[detailsId]?.products?.map(({ productId: { name, price, stock, image } }) => (

                                                <>
                                                    <li>Product Name:{name} </li>
                                                    <li>Price: {price} </li>
                                                    <li>Stock: {stock} </li>
                                                    <img src={`http://localhost:5000/${image}`} alt="" height={100} />

                                                </>
                                            ))
                                        }
                                    </ol>




                                </Typography>



                            </Box>

                        </Modal>


                        {/* model for userdata */}
                    </>

            }


        </>
    )
}
