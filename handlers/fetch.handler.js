const dataModel = require ("../dataModel");

const fetchHandler = (io, socket) => {
    socket.on('fetchdata', async (user) => {
        try{;
            const existingData = await dataModel.find({},{name:1, email:1});
            io.emit("data", existingData);
        } catch(err){
            console.log("Error fetching data: ", err);
            socket.emit("error", {error: "Error fetching data!"});
        }
    });
};
module.exports = {fetchHandler};