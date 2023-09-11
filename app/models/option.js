import mongoose, { Schema } from "mongoose";

const optionSchema = new Schema({
  key: {
    type: Number,
    required: [true, "key is required"],
  },
  city: {
    type: String,
  },
  MenuLabel: { type: String },
  foodName: { type: String },
  qType: { type: String },
  cuisine: { type: String },
  veg: { type: String },
  MealType: { type: String },
  meal: { type: String },
  SP: { type: Number },
  
  date: {
    type: Date,
    default: Date.now,
  },
});

const Option = mongoose.models.Option || mongoose.model("Option", optionSchema);

// console.log("optionSchema zxczxcv- " + Option);
export default Option;
