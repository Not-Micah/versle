import mongoose, { Schema } from "mongoose";

const verseSchema = new Schema(
    {
        location: String,
        date: String,
        book: String,
        verse: String,
    }
)

const Verse = mongoose.models.Verse || mongoose.model("Verse", verseSchema);
// Ask ChatGPT what "Verse" does here...

export default Verse;