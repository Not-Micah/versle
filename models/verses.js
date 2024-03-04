import mongoose, { Schema } from "mongoose";

const verseSchema = new Schema(
    {
        location: String,
        date: String,
        book: String,
        verse: String,
    }
)

// Existing "Verse" schema with Date instead of String
const Verse = mongoose.models.DailyVerse || mongoose.model("DailyVerse", verseSchema);
// Ask ChatGPT what "Verse" does here...

export default Verse;