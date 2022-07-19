import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

// modal imports
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

import { getAllUsersAction, usersActiveAction, usersAdminAction } from "../../store/actions/userAction";
// modal imports end

// modal style
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
// modal style end
export default function Users() {
  // Admin modal
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  // Admin modal  end

  // Active modal
  const [popen, setpOpen] = React.useState(false);
  const handlepOpen = () => setpOpen(true);
  const handlepClose = () => setpOpen(false);
  // Active modal  end

  const [adminId, setadminId] = useState();
  const [userisAdmin, setuserisAdmin] = useState(true);
  const [userisActive, setuserisActive] = useState(false);
  


  const dispatch = useDispatch();
  const { isLoading, users } = useSelector((state) => state.user);
  useEffect(() => {
    dispatch(getAllUsersAction());
  }, []);

  console.log(users);
  return (
    <>
       <TableContainer component={Paper}>
        {/* {JSON.stringify(users)} */}
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>User name</TableCell>
                            <TableCell align="right">Email</TableCell>
                            <TableCell align="right">Mobile</TableCell>
                            <TableCell align="right">Admin</TableCell>
                            <TableCell align="right">Active</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users?.map(item => (
                            <TableRow
                                key={item.name}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {item.name}
                                </TableCell>
                                <TableCell align="right">{item.email}</TableCell>
                                <TableCell align="right">{item.mobile}</TableCell>
                                <TableCell align="right">{<Button onClick={e => {
                                    handleOpen()
                                    setuserisAdmin(item.isAdmin)
                                    setadminId(item._id)

                                }}>Edit</Button>}</TableCell>
                                <TableCell align="right">{<Button onClick={e => {
                                    handlepOpen()
                                    setuserisActive(item.isActive)
                                    setadminId(item._id)
                                }}>Edit</Button>}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Admin modal */}
            <div>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            {
                                userisAdmin 
                                ? "Are you sure you want to remove this user admin"
                                : "Are you sure you want to make this user as admin?"

                            }
                        </Typography>
                       
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            {
                                userisAdmin
                                ?
                                <Button color='error' onClick={e => {
                                    dispatch(usersAdminAction(adminId,false))
                                    handleClose()
                                }
                                }
                                >Remove</Button>
                                :
                                <Button color='error' onClick={e => {
                                    dispatch(usersAdminAction(adminId,true))
                                    handleClose()
                                }
                                }
                                >Yes</Button>
                                

                            }
                            <Button onClick={handleClose}>No</Button>
                        </Typography>
                    </Box>
                </Modal>
            </div>
            {/* Admin modal end */}

            {/* Active modal */}
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
                                userisActive 
                                ? "Are you sure you want to Deactivate this user?"
                                : "Are you sure you want to Activate this user?"

                            }
                        </Typography>
                       
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            {
                                userisActive
                                ?
                                <Button color='error' onClick={e => {
                                    dispatch(usersActiveAction(adminId,false))
                                    handlepClose()
                                }
                                }
                                >Deactivate</Button>
                                :
                                <Button color='error' onClick={e => {
                                    dispatch(usersActiveAction(adminId,true))
                                    handlepClose()
                                }
                                }
                                >Activate</Button>
                                

                            }
                            <Button onClick={handlepClose}>No</Button>
                        </Typography>
                    </Box>
                </Modal>
            </div>
            {/* Active modal end */}
    </>
  );
}
