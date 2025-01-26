const mongoose = require("mongoose");

const orderchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    products: {
      type: Array,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    shippingAdress: {
      address: { type: String, required: true },
      city: { type: String, required: true },
      postalCode: { type: String, required: true },
      country: { type: String, required: true },
    },
    isPaid: {
      type: Boolean,
      required: true,
      default: false,
    },
    paidAt: {
      type: Date,
    },
    isDelivered: {
      type: Boolean,
      required: true,
      default: false,
    },
    deliveredAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderchema);

// orderItems: [
//   {
//     name: { type: String, required: true },
//     quantity: { type: Number, required: true },
//     price: { type: Number, required: true },
//     product: {
//       type: mongoose.Schema.Types.ObjectId,
//       required: true,
//       ref: "Product",
//     },
//   },
// ],

// paymentMethod: {
//   type: String,
//   required: true,
// },

// paymentResult: {
//   id: { type: String },
//   status: { type: String },
//   updateTime: { type: String },
//   emailAdress: { type: String },
// },
