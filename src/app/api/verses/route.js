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
    const today = new Date().toISOString().split('T')[0];
    const verse = await Verse.findOne({ date: today }); 

    if (verse) {
        return NextResponse.json(verse);
    } else {
        return NextResponse.error(new Error("Verse for today not found"), { status: 404 });
    }
}

export async function POST(request) {
    const { location, date, book, verse } = await request.json();
    await connectMongoDB();

    await Verse.create({ location, date, book, verse });
    return NextResponse.json({ message: "Daily Verse Added", status: 201 });
}

// In POST request, verify that it is a new verse
// Create 2 GET methods... one for daily verse and one for all verses