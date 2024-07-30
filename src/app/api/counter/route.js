import connectMongoDB from "../../../../libs/mongodb";
import Counter from "../../../../models/counter";
import { NextResponse } from "next/server";

export async function POST(request) {
    await connectMongoDB();

    const counter = await Counter.findOneAndUpdate(
        { __v: 0 },
        { $inc: { plays: 1 } },
        { new: true }
    );

    if (!counter) {
        return NextResponse.json({ message: "Counter not found", status: 404 });
    }

    return NextResponse.json({ message: "Counter Updated", status: 200, counter });
}
