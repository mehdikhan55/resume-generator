import { NextResponse } from "next/server";
import dbConnect from "../../../lib/dbConnect";
import Resume from "../../../models/Resume";

export const GET = async (req) => {

    await dbConnect();

    try {
        const resumes = await Resume.find({ isPublic: true }).sort({ createdAt: -1 }).populate('userId');
        return NextResponse.json(resumes, { status: 200 });
    } catch (err) {
        console.error('API route error in community resumes api:', err);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
};
