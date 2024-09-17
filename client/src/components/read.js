import React, {useState,useEffect,useContext} from "react";
import { SocketContext } from "../socketContext";

function Read(){
    const socket = useContext(SocketContext);
    const [serverData, setServerData] = useState("");
    useEffect(() => {
        // Request the server to send the latest data
        socket.emit("requestReadData");
    
        // Set up the socket listener
        socket.once("read", (data) => {
            console.log("request data: ", data)
            setServerData(data);
        });
    
        // Clean up the socket listener on unmount
        return () => {
          socket.off("read");
        };
    }, [socket]);
    return (
        <div className="readMess">
            {serverData}
        </div>
    );

}
export default Read;