import mongoose from "mongoose";
import   mongooseConnect   from "../lib/mongoose";

 
const useCollection = async(query:string) => {
    await mongooseConnect() 
    try { 
        const typeCollection = mongoose.connection.collection(query);
        return await typeCollection.find({}).toArray(); 
    } catch (error) {
      console.error('Error al obtener la collección:', error);
    } finally { 
       mongoose.disconnect();
    }

}

export default useCollection