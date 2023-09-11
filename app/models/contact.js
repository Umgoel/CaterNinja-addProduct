import mongoose, { Schema } from "mongoose";

//expected schema
const contactSchema = new Schema({
  ID: {
    type: Number,
    required: [true, "ID is required"],
  },
  fullname: {
    type: String,
    required: [true, "name is reqd"],
    trim: true,
    minLength: [2, ">>2 chars"],
    maxLength: [50, "<<50 chars"],
  },
  email: {
    type: String,
    required: [true, "email id is required"],
  },
  price: {
    type: Number,
    required: [true, "Price is required"],
  },
  selectedOptions: {
    type: Array,
    required: [true, "food options is required"],
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Contact =
  mongoose.models.Contact || mongoose.model("Contact", contactSchema);

// console.log(Contact);
export default Contact;
