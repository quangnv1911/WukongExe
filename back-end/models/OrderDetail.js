import mongoose, { Schema } from "mongoose";
import Voucher from "./Voucher";
import Product from "./Product";
import Order from "./Order";

const orderDetailSchema = new Schema({
    product: {
        type: Schema.Types.ObjectId,
        ref: Product,
        required: true
    },
    order: {
        type: Schema.Types.ObjectId,
        ref: Order,
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: 1
    }
});

const OrderDetail = mongoose.model('orderDetails', orderDetailSchema);
export default OrderDetail;