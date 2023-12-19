import { NextResponse } from "next/server";
import Connect from "../../../../connect";
import City from "../../../../models/City";

export const GET = async (request) => {
    try {
        await Connect();

        // Find the last 5 posts and sort them in descending order by _id
        const posts = await City.find().sort({ _id: -1 }).limit(5);

        return new NextResponse(JSON.stringify(posts), { status: 200, headers: { 'Content-Type': 'application/json' } });
    } catch (error) {
        return new NextResponse("Error in fetching posts" + error, { status: 500 });
    }
}