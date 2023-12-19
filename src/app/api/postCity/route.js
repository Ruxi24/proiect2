import { NextResponse } from "next/server";
import City from "../../../../models/City";
import Connect from "../../../../connect";
export const POST = async (req, res) => { 
    const { name, id } = await req.json();
    try {
        await Connect();
        const existingCity = await City.findOne({
            id: id
        })
        if(!existingCity){
            const newCity = await City.create({ name, id});
            console.log(newCity);
            return NextResponse.json({msg: ["City added to favorites"], success: true,});
        }
        return NextResponse.json({ msg: ["City already saved in favorites"], success: false });
    } catch (error) {
        return new NextResponse("Error in fetching posts" + error, {status: 500})
    }

}