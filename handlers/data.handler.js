const dataModel = require("../dataModel");

const writetodatabase = async (io,socket) => {
    socket.on('writetodatabase', async (data) => {
        try{
            const { name, email, password} = data;
            if( !name || !email || !password ){
                socket.emit ("error", { error: "All fields are required"});
                return;
            }

            const existingEmail = await dataModel.findOne({email});
            if(existingEmail){
                socket.emit("error", {error: "User already exists, please choose a different email!"});
            }else {
                console.log("Received data: ", data);
                const newData = new dataModel({name, email, password});
                await newData.save();

                const updatedData = await dataModel.find({}, { name: 1, email: 1 });
                io.emit("data", updatedData);
                
                socket.emit("success", {message: "Data saved successfully: ",name:newData.name, email:newData.email});
            }
        }catch(err){
            console.log(err);
            socket.emit("error", {error: "Server errror while saving data!"});
        }
    });
}
module.exports = {writetodatabase}