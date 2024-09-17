const { drawHandler } = require("./handlers/draw.handler");
const { writetodatabase } = require("./handlers/data.handler");
const { fetchHandler } = require("./handlers/fetch.handler");
const {createServer} = require("http");
const {Server} = require ("socket.io");

const httpServer = createServer();
const io = new Server(httpServer, {
    cors:{
        origin: 'http://localhost:3001',  
    }
});

io.on("connection", (socket) => {
    //console.log(socket);

    socket.on("requestReadData", () => {
        socket.emit("read", "hey from the server");
      });
    drawHandler(io, socket);
    writetodatabase(io, socket);
    fetchHandler(io, socket);

});

httpServer.listen(3000, () => {
    console.log('server is connected');
});




/*const express = require ("express");
const dataModel = require ("./dataModel");

const app = express();
app.use(express.json({extended:false}));

// we need cors middleware here because frontend and backend run on different ports.
const cors = require("cors");
app.use(cors());

app.get("/readfromserver", (req,res) => {
    res.json({message: "Hey man from server"});
});

app.post("/writetodatabase", async(req,res) => {
    try{
        const { name,email,password } = req.body;
        // Validate request data
        if (!name || !email || !password) {
            return res.status(400).json({ error: "All fields are required" });
        }
        
        const existingEmail = await dataModel.findOne({email: req.body.email})
        if(existingEmail){
            res.send("User already exists, please choose a different email!");
        }else{
            console.log("Request Body: ", req.body)
            const newData = new dataModel({name, email, password});
            await newData.save();
            // await dataModel.insertMany({content});
            res.json({message:"Data saved successfully"})
        }


    }catch(err){
        console.log(err);
        res.status(500).send("Server error while saving data!")
    }
})
app.get ("/displaydata", async (req,res) => {
    try{
        const data = await dataModel.find({},{name:1, email:1});
        res.json(data);
    } catch(err){
        res.status(500).send("Error fetching data");
    }
    
});

// async function fetchData(){
//     try{
//         const data = await dataModel.find({},{name:1, email:1});
//         console.log(data);
//     } catch(err){
//         console.log("Error fetching data",err);
//     }
// };
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`server is running on PORT: ${PORT}`);
    // fetchData();
}); */