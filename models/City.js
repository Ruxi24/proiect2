import mongoose from "mongoose";

const { Schema } = mongoose;

const citySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    id: {
        type: String,
        required: true
    },
})

export default mongoose.models.City || mongoose.model("City", citySchema)