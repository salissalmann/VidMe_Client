import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from './Components/Homepage/Homepage'
import CreateAccount from './Components/UserSignUp/CreateAccount.jsx'
import CreateProfile from './Components/ProfileSetup/index'
import ProfessionalProfile from './Components/ProfileSetup/ProfessionalInformation'
import PersonalInformation from './Components/ProfileSetup/PersonalInformation'
import VideoRecorder from './Components/ProfileSetup/RecordYourself';
import SeekerDashboard from './Components/SeekerDashboard/Main.jsx'
import Form from './Components/Form/Form'


function App() {
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
          <Route path="/Chat/:IdGlobal" element={<Form/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
