import mongoose from "mongoose";

 const Connect = async () => {
    try {
        await mongoose.connect(`mongodb+srv://negoitaruxandra24:2tZmbDJSlMiLkp4I@cluster0.dh0db06.mongodb.net/proiect2`);
        console.log('connected to db...')
        
    } catch (error) {
        throw new Error("Could not connect to mongodb...")
    }
}

export default Connect