import { NextResponse } from "next/server";
import City from "../../../../models/City";
import Connect from "../../../../connect";

export const DELETE = async (req, res) => { 
    const { id } = await req.json();

    try {
      await Connect();
      const deletedCity = await City.findOneAndDelete({ id });
  
      if (deletedCity) {
        console.log(`City with id: ${id} deleted:`, deletedCity);
        return NextResponse.json({ msg: ["City deleted from favorites"], success: true });
      } else {
        console.log(`City with cityId ${id} not found`);
        return new NextResponse("City not found", { status: 404 });
      }
    } catch (error) {
      console.error('Error deleting city:', error);
      return new NextResponse("Error in deleting city" + error, { status: 500 });
    }

}