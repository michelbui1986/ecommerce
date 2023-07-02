import { getProductsreducer } from "./Productsreducers";
import { combineReducers } from "redux"

const rootreducer = combineReducers({
    getproductsdata:getProductsreducer
})

export default rootreducer