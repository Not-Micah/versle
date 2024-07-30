import mongoose, { Schema } from "mongoose";

const counterSchema = new Schema(
    {
        plays: Number
    }
)

// Existing "Verse" schema with Date instead of String
const Counter = mongoose.models.Counter || mongoose.model("Counter", counterSchema);

export default Counter;