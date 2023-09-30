import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from './Components/Homepage/Homepage'
import CreateAccount from './Components/UserSignUp/CreateAccount.jsx'
import CreateProfile from './Components/ProfileSetup/index'
import ProfessionalProfile from './Components/ProfileSetup/ProfessionalInformation'
import PersonalInformation from './Components/ProfileSetup/PersonalInformation'
import VideoRecorder from './Components/ProfileSetup/RecordYourself';
import SeekerDashboard from './Components/SeekerDashboard/Main.jsx'
import Message from './Components/Message/Message'
import FriendSuggestions from './Components/Suggestions/Suggestions'
import Verification from './Components/Verification/Verification';
import { gapi } from 'gapi-script';
import { useEffect } from 'react';

function App() {
  let Id = "764460646840-47dor69kkfjj5uejtnd6pvs853vqeehl.apps.googleusercontent.com";
  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: Id,
      })
    }

    gapi.load('client:auth2', start);
  }, [])
  

  return (
    <div className="App">
      <BrowserRouter>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/login" element={<Homepage />} />
            <Route path="/create-account" element={<CreateAccount />} />
            <Route path="/create-profile" element={<CreateProfile />} />
            <Route path="/professional-profile" element={<ProfessionalProfile />} />
            <Route path="/personal-profile" element={<PersonalInformation />} />
            <Route path="/video-recorder" element={<VideoRecorder />} />
            <Route path="/dashboard" element={<SeekerDashboard />} />
            <Route path="/Chat/:IdGlobal" element={<Message/>}/>
            <Route path="/suggestions" element={<FriendSuggestions/>} />
            <Route path="/verification" element={<Verification/>} />
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
