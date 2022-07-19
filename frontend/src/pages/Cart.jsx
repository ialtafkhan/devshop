import React, { useEffect, useState } from "react";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import axios from "axios";

import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import InboxIcon from "@mui/icons-material/Inbox";
import DraftsIcon from "@mui/icons-material/Drafts";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { gsap } from "gsap"
import { useSelector, useDispatch } from "react-redux"
import { emptyCartAction, removeCartItemAction } from "../store/actions/cartAction";
export default function Cart() {
  const dispatch = useDispatch()
  const { cartItem: product } = useSelector(state => state.cart)
  return (
    <>
      {
        product.length === 0
          ? <h1>Cart is empty</h1>
          : <>
            <Button onClick={e => dispatch(emptyCartAction())}>Empty Cart</Button>
            <Grid container>
              <Grid item sm={8}>
                <List
                  sx={{ width: "100%", maxWidth: 600, bgcolor: "background.paper" }}
                >
                  {product.map((item) => (
                    <>
                      <ListItem alignItems="flex-start">
                        <ListItemAvatar>
                          <img alt={item.name} src={`http://localhost:5000/${item?.image}`} height="100" />
                        </ListItemAvatar>
                        <ListItemText
                          sx={{ marginLeft: 4 }}
                          primary={item.name}
                          secondary={
                            <React.Fragment>
                              <Typography
                                sx={{ display: "inline" }}
                                component="span"
                                variant="body2"
                                color="text.primary"
                              >
                                {item.description}
                              </Typography>

                              <Typography variant="h6" color="text.primary">
                                {item.qty === 1
                                  ? `₹${item.price}`
                                  : `₹${item.price} X ${item.qty} = ₹${item.qty * item.price
                                  }`}
                              </Typography>
                            </React.Fragment>
                          }
                        />
                      </ListItem>
                      <Button color="error" onClick={e => dispatch(removeCartItemAction(item.id))}>Remove</Button>
                      <Divider variant="inset" component="li" />
                    </>
                  ))}
                </List>
              </Grid>
              <Grid item sm={4}>
                <Box
                  sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
                >
                  <nav aria-label="main mailbox folders">
                    <List>
                      <ListItem disablePadding>
                        <Typography
                          sx={{ display: "inline" }}
                          component="span"
                          variant="body2"
                          color="text.primary"
                        >
                          Products Details
                        </Typography>
                      </ListItem>
                    </List>
                  </nav>
                  <Divider />
                  <nav aria-label="secondary mailbox folders">
                    <List>
                      <ListItem>
                        <Stack
                          direction={"row"}
                          justifyContent="space-between"
                          sx={{ width: "100%" }}
                        >
                          <Typography variant="body1">Quntity</Typography>
                          <Typography variant="h6">{product.reduce((total, item) => total + item.qty, 0)}</Typography>
                        </Stack>
                      </ListItem>
                      <ListItem>
                        <Stack
                          direction={"row"}
                          justifyContent="space-between"
                          sx={{ width: "100%" }}
                        >
                          <Typography variant="body1">Shipping</Typography>
                          <Typography variant="h6">Free</Typography>
                        </Stack>
                      </ListItem>
                      <ListItem>
                        <Stack
                          direction={"row"}
                          justifyContent="space-between"
                          sx={{ width: "100%" }}
                        >
                          <Typography variant="body1">Discount</Typography>
                          <Typography variant="h6">78% Off</Typography>
                        </Stack>
                      </ListItem>
                      <ListItem>
                        <Stack
                          direction={"row"}
                          justifyContent="space-between"
                          sx={{ width: "100%" }}
                        >
                          <Typography variant="h6">Tax</Typography>
                          <Typography variant="h6">{
                            28 / 100 * product.reduce((total, item) => total + item.qty * item.price, 0)
                          }</Typography>
                        </Stack>
                      </ListItem>
                      <ListItem>
                        <Stack
                          direction={"row"}
                          justifyContent="space-between"
                          sx={{ width: "100%" }}
                        >
                          <Typography variant="h6">Total</Typography>
                          <Typography variant="h6">{
                            product.reduce((total, item) => total + item.qty * item.price, 0)
                          }</Typography>
                        </Stack>
                      </ListItem>
                    </List>
                  </nav>
                </Box>
                <Link to="/payment">
                  <Button variant="contained" color="info">
                    Chekout
                  </Button>
                </Link>
              </Grid>
            </Grid>
          </>

      }
    </>
  );
}
