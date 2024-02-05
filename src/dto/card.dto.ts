import mongoose, { Schema } from "mongoose";
import {
  isValidCvvNumber,
  isValidEmail,
  isValidExpirationMonth,
  isValidExpirationYear,
  isValidLuhn,
  isValidToken,
} from "../utils/funtions";

export interface ICard extends Document {
  [x: string]: any;
  token: string;
  cardNumber: number;
  cvv: string;
  expirationMonth: string;
  expirationYear: string;
  email: string;
  createdAt: Date;
}

const CardSchema: Schema = new Schema({
  token: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: isValidToken,
      message: "Invalid token format.",
    },
  },
  cardNumber: {
    type: Number,
    required: true,
    minlength: 13,
    maxlength: 16,
    validate: {
      validator: isValidLuhn,
      message: "Invalid credit card number.",
    },
  },
  cvv: {
    type: Number,
    required: true,
    validate: {
      validator: isValidCvvNumber,
      message: "CVV must have 3 or 4 digits.",
    },
  },
  expirationMonth: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 2,
    validate: {
      validator: isValidExpirationMonth,
      message: "Invalid expiration month.",
    },
  },
  expirationYear: {
    type: String,
    required: true,
    minlength: 4,
    maxlength: 4,
    validate: {
      validator: isValidExpirationYear,
      message: "Invalid expiration year.",
    },
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 100,
    validate: {
      validator: isValidEmail,
      message: "Invalid email or domain.",
    },
  },
  createdAt: { type: Date, default: Date.now, expires: "15m" },
});

export default mongoose.model<ICard>("Card", CardSchema);
