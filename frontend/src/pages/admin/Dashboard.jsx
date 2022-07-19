import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useDispatch, useSelector } from "react-redux"
import { Link } from 'react-router-dom';
import { deleteProductAction, handlePublishEditAction, productAction } from '../../store/actions/productAction';
// modal imports
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { adminProductAction } from '../../store/actions/admin/adminAction';
// modal imports end

// modal style
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};
// modal style end
export default function Dashboard() {
    const [deleteId, setdeleteId] = useState()
    // modal
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [popen, setpOpen] = React.useState(false);
    const handlepOpen = () => setpOpen(true);
    const handlepClose = () => setpOpen(false);
    // modal  end
    const [isProdouctPublish, setisProdouctPublish] = useState(true)
    const [publishId, setpublishId] = useState()
    const dispatch = useDispatch()
    const { isLoading, products } = useSelector(state => state.admin)
    useEffect(() => {
        dispatch(adminProductAction())
    }, [])

    console.log(products);
    return (
        <>

            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Product name</TableCell>
                            <TableCell align="right">Price</TableCell>
                            <TableCell align="right">Stock</TableCell>
                            <TableCell align="right">Publish</TableCell>
                            <TableCell align="right">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {products.map(item => (
                            <TableRow
                                key={item.name}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {item.name}
                                </TableCell>
                                <TableCell align="right">{item.price}</TableCell>
                                <TableCell align="right">{item.stock}</TableCell>
                                <TableCell align="right">{<Button onClick={e => {
                                    handlepOpen()
                                    setisProdouctPublish(item.publish)
                                    setpublishId(item._id)
                                }}>Edit</Button>}</TableCell>
                                <TableCell align="right">
                                    <Button><Link to={`/admin/edit/${item._id}`} >Edit</Link></Button>
                                    <Button onClick={e => {
                                        handleOpen()
                                        setdeleteId(item._id)
                                    }} >Delete</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* modal */}
            <div>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Are you sure you want to delete this product?
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            <Button color='error' onClick={e => {
                                dispatch(deleteProductAction(deleteId))
                                dispatch(productAction())
                                handleClose()
                            }
                            }
                            >Yes</Button>
                            <Button onClick={handleClose}>No</Button>
                        </Typography>
                    </Box>
                </Modal>
            </div>
            {/* modal end */}

            {/* publish modal */}
            <div>
                <Modal
                    open={popen}
                    onClose={handlepClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            {
                                isProdouctPublish
                                    ? "Do you want to Unpublish this product?"
                                    : "Do you want to Publish this product?"
                            }

                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            {
                                isProdouctPublish
                                    ? <Button onClick={e => {
                                        handleClose()
                                        dispatch(handlePublishEditAction(publishId, false))
                                    }
                                    }>Unpublish</Button>
                                    : <Button color='error' onClick={e => {
                                        dispatch(handlePublishEditAction(publishId, true))
                                        handleClose()

                                    }
                                    }
                                    >Publish</Button>

                            }


                            <Button onClick={handleClose}>Cancel</Button>
                        </Typography>
                    </Box>
                </Modal>
            </div>
            {/* publish modal end */}

        </>
    )
}
