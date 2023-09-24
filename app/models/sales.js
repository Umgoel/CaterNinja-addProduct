import mongoose, { Schema } from "mongoose";

const saleSchema = new Schema({
  empid: { type: Number },
  sales: { type: Number},
  date: { type: Date  }
});

const sales = mongoose.models.sales || mongoose.model("sales", saleSchema);
export default sales;