import connectMongoDB from "../../../../libs/mongodb";
import Verse from "../../../../models/verses";
import { NextResponse } from "next/server";

// export async function GET() {
//     await connectMongoDB();
//     const verses = await Verse.find();
//     return NextResponse.json({ verses });
// }

export async function GET() {
    await connectMongoDB(); 
    console.log("was here")
    // const today = new Date().toISOString().split('T')[0]; // Get today's date in the format "YYYY-MM-DD"
    const verses = await Verse.find(); 
    return NextResponse.json(verses); 
}

export async function POST(request) {
    const { location, date, book, verse } = await request.json();
    await connectMongoDB();

    await Verse.create({ location, date, book, verse });
    return NextResponse.json({ message: "Daily Verse Added", status: 201 });
}

// In POST request, verify that it is a new verse
// Create 2 GET methods... one for daily verse and one for all verses