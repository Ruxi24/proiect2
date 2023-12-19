import { NextResponse } from "next/server";
import City from "../../../../models/City";
import Connect from "../../../../connect";

export const GET = async (request) => {
    try {
        await Connect();
        const posts = await City.find();
        return new NextResponse(JSON.stringify(posts) , {status: 200, headers: { 'Content-Type': 'application/json' }})
    } catch (error) {
        return new NextResponse("Error in fetching posts" + error, {status: 500})
    }
}