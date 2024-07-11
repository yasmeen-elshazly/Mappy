import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './Pages/Home/Home';
import ContinentMap from './Components/map/Continents/ContinentMap';
import MapComponent from './Components/map/Landmarks/MapComponent';
import Navbar3 from './Components/dashboard/Navbar/Navbar'
import Navbar2 from './Components/dashboard/Navbar/Navbar2';
import MountainsMap from './Components/map/mountains/mountains';
import Leaderboard from './Pages/leaderboard/leaderboard';
import LearnAfrica from "./Components/map/AfricaContries/LearnAfrica"; // Corrected import path
import PlayAfrica from './Components/map/AfricaContries/PlayAfrica';
import User from './Pages/profile/User';
import Login from "./Pages/Login/Login"; // Corrected import path
import SignUp from "./Pages/Login/SignUp"; // Corrected import path
import NotFound from "./Pages/notFound/NotFound"; // Corrected import path
import { useSelector } from "react-redux";

function App() {
  const currentUser = useSelector(state => state.currentUser.currentUser)
  console.log(currentUser);

  return (
    <>
      <Router>
        <>
          {currentUser && currentUser.username ?
            (
              <>
                <Navbar3/>
              </>
            )
            :
            (
              <>
                <Navbar2/>
              </>

            )
          }
        </>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/world-games" element={<ContinentMap />} />
          <Route path="/map-component" element={<MapComponent />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/mountains-map" element={<MountainsMap />} />
          <Route path="/learn-africa" element={<LearnAfrica />} />
          <Route path="/play-africa" element={<PlayAfrica />} />
          <Route path="/user" element={<User />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
