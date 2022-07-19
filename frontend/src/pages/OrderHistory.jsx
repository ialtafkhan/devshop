import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

// date ch format sathi he lib use keli => date-fns 
import { format } from "date-fns"

import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getAllOrderAction, statusUpdateOrderAction } from "../store/actions/orderAction";
import { Button, Container, Hidden, Modal, Typography } from "@mui/material";
import { Box } from "@mui/system";

// // modal style
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  height: 500,
  bgcolor: "#fff",
  border: "2px solid #000",
  boxShadow: 24,
  overflow: "hidden",
  p: 4,
};



export default function OrderHistory() {
  const dispatch = useDispatch();
  const { orders } = useSelector((state) => state.order);

  const [open, setOpen] = React.useState(false);
  const [deleteOrder, setdeleteOrder] = React.useState();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // setDetailId
  const [detailId, setDetailId] = useState();

  const [status, setstatus] = useState();
  const [orderId, setorderId] = useState();

  useEffect(() => {
    dispatch(getAllOrderAction());

  }, []);


  return (
    <>
      <TableContainer component={Paper}>
        {/* {JSON.stringify(orders)} */}
        <Table style={{ overflow: "hidden" }}>
          <TableHead style={{ backgroundColor: "lightblue" }}>
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
            {orders.map((item, index) => (
              <>
                <TableRow>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{format(new Date(item.createdAt), "dd MMM yyyy")}</TableCell>
                  <TableCell>{item.mode}</TableCell>
                  <TableCell>{item.status}</TableCell>
                  <TableCell>
                    <ol>
                      {item.products.map((single) => (
                        <>
                          <li>{single.productId?.name}</li>
                        </>
                      ))}
                    </ol>
                  </TableCell>
                  <TableCell>
                    <Button
                      onClick={e => {
                        handleOpen();
                        setDetailId(index);
                        setorderId(item._id)
                      }}
                    >
                      Details
                    </Button>
                  </TableCell>
                </TableRow>
              </>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* modal */}
      <div>
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
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Order Details
            </Typography>
            <select
              class="form-select"
              value={status}
              onChange={(e) => setstatus(e.target.value)}
            >
              <option selected>Open this select menu</option>
              <option value="placed">Placed</option>
              <option value="dispatch">Dispatch</option>
              <option value="transit">Transit</option>
              <option value="delivered">Delivered</option>
            </select>

            <Button onClick={e => {
              dispatch(statusUpdateOrderAction(orderId, status))
            }}>
              Update Status</Button>
            <br />
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {/* {JSON.stringify(orders[detailId])} */}

              name : {orders[detailId]?.userId?.name}
              <br />
              status:{orders[detailId]?.status}
              <br />
              payment : {orders[detailId]?.mode}
              <br />
              <ol>
                {orders[detailId]?.products?.map(
                  ({ productId: { name, price, stock, image } }) => (
                    <>
                      <li>Products Name :{name}</li>
                      <li>Price :{price}</li>
                      <li>Stock :{stock}</li>
                      <img src={`http://localhost:5000/${image}`} alt="" />
                    </>
                  )
                )}
              </ol>
            </Typography>
          </Box>
        </Modal>
      </div>
      {/* modal end */}
    </>
  );
}
