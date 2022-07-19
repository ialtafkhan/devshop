import { createStore, combineReducers, applyMiddleware } from "redux"

import { composeWithDevTools } from "redux-devtools-extension"

import thunk from "redux-thunk"
import { adminReducer } from "./reducers/admin/adminReducer"
import { cartReducer } from "./reducers/cartReducer"
import { orderReducer } from "./reducers/orderReducer"
import { productReducer } from "./reducers/productReducer"
import { userReducer } from "./reducers/userReducer"

const localCartData = localStorage.getItem("localCart")
    ? JSON.parse(localStorage.getItem("localCart"))
    : []
const localUserData = localStorage.getItem("login")
    ? JSON.parse(localStorage.getItem("login"))
    : {}

const rootReducer = combineReducers({
    products: productReducer,
    cart: cartReducer,
    user: userReducer,
    order: orderReducer,
    admin: adminReducer
})
const initialState = {
    cart: { cartItem: localCartData },
    user: { login: localUserData }
}
const store = createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(thunk))
)
export default store