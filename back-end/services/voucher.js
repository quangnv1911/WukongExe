import Voucher from "../models/Voucher.js";

export const createVoucher = async (voucherData) => {
    try {
        return await Voucher.create(voucherData);
    } catch (error) {
        throw new Error(error);
    }
};

export const getAllVouchers = async () => {
    try {
        return await Voucher.find();
    } catch (error) {
        throw new Error(error);
    }
};

export const getVoucherByCode = async (code) => {
    try {
        return await Voucher.findOne({ code });
    } catch (error) {
        throw new Error(error);
    }
};

export const updateVoucher = async (code, voucherData) => {
    try {
        return await Voucher.findOneAndUpdate({ code }, voucherData, { new: true });
    } catch (error) {
        throw new Error(error);
    }
};

export const deleteVoucher = async (code) => {
    try {
        return await Voucher.findOneAndDelete({ code });
    } catch (error) {
        throw new Error(error);
    }
};
