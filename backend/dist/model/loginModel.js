"use strict";
// import mongoose from "mongoose";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OtpModel = void 0;
// const {Schema,model}= mongoose
// interface getNumber {
//     phone :string
// }
// const LoginSchema = new Schema<getNumber>( {
//     phone :{type:String,required:true}
// })
// const loginModel = model<getNumber>("login",LoginSchema)
// export default loginModel
const mongoose_1 = require("mongoose");
const otpSchema = new mongoose_1.Schema({
    phone: { type: String, required: true },
    otp: { type: String, required: true },
    secret: { type: String, required: true },
});
exports.OtpModel = (0, mongoose_1.model)('Otp', otpSchema);
