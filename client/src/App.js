import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
import  Read from "./components/read";
import Write from "./components/write";
import Draw from "./components/draw";

function App (){

  return (
    <Router>
      <div className="App">
        <div className="spanLink">
          <span><Link to="/read" className="no-underline">Read data from Server</Link></span>
          <b>/</b>
          <span><Link to="/write" className="no-underline">Write data to mongodb</Link></span>
          <b>/</b>
          <span><Link to="/draw" className="no-underline">DrawBoard</Link></span>
        </div>
        <Routes>
          <Route path="/draw" element={<Draw/>}/>
          <Route path="/read" element={<Read/>}/>
          <Route path="/write" element={<Write/>}/>
          <Route path="/" element={<Write/>}/> 
        </Routes>
      </div>
    </Router>
  );
}
export default App;