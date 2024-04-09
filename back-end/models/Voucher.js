import mongoose, { Schema } from "mongoose";

const voucherSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    percent: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
    },
    expiryDate: {
        type: Date,
    },
}, {
    timestamps: true
});

const Voucher = mongoose.model('vouchers', voucherSchema);
export default Voucher;