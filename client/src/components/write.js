import React, { useState, useContext, useEffect } from "react";
import { SocketContext } from "../socketContext";

function Write() {
    const socket = useContext(SocketContext);
    const [inputValueUsername, setInputValueUsername] = useState("");
    const [inputValueEmail, setInputValueEmail] = useState("");
    const [inputValuePass, setInputValuePass] = useState("");
    const [data, setData] = useState([]);
    
    const saveData = () => {
        console.log("Submitting:", { name: inputValueUsername, email: inputValueEmail, password: inputValuePass });

        // Emit data to the server
        socket.emit('writetodatabase', { name: inputValueUsername, email: inputValueEmail, password: inputValuePass });
        setInputValueEmail("");
        setInputValueUsername("");
        setInputValuePass("");
    };

    useEffect(() => {
        // Listen for success or error messages
        socket.on('success', (response) => {
            alert(response.message + response.name + " " + response.email);
        });

        socket.on('error', (error) => {
            console.log(error)
            alert("Error: " + error.error);
        });

        // Fetch initial data from the server
        socket.emit('fetchdata');

        // Listen for data event to receive the data from the server
        socket.on('data', (user) => {
            console.log("Received user data:", user);
            setData(user);  // Set the received data in the state
        });
        // Cleanup
        return () => {
            socket.off('success');
            socket.off('error');
            socket.off('data');
        };
    }, [socket]);

    return (
        <div className="container">
            <div className="registerBox">
                <input
                    type="text"
                    placeholder="Username"
                    value={inputValueUsername}
                    onChange={e => setInputValueUsername(e.target.value)}
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={inputValueEmail}
                    onChange={e => setInputValueEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={inputValuePass}
                    onChange={e => setInputValuePass(e.target.value)}
                />
            </div>
            <button onClick={saveData}>Register</button>
            <table>
                <tbody>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                    </tr>
                    {data.map((item, index) => (
                        <tr key={index}>
                            <td>{item.name}</td>
                            <td>{item.email}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Write;
