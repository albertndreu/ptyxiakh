import Home from './Home';
import Header from './Header';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RegisterCandidate from './RegisterCandidate';




function App() {


  return (
    <Router>
    <div className="App">
      <Header/> 
      <div className="content">
         <Routes>
            <Route path="/" element={<Home />} />
            {/*<Route path="/RegisterDocument" element={<RegisterDocument />} />*/}
            {/*<Route path="/AllDocuments" element={<AllDocuments />} />*/}
            {/*<Route path="/MyDocuments" element={<MyDocuments/>} />*/}
            {/*<Route path="/Profile" element={<Profile/>} />*/}
            {/*<Route path="/LogIn/Logout" element={<LogInLogout/>} />*/}
            <Route path="/RegisterCandidate" element={<RegisterCandidate/>} />
          </Routes>
      </div>
    </div>
    </Router>
  );
}

export default App;
