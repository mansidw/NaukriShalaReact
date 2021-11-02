import React from "react"
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Signup from "./Sign/Signup"
import { AuthProvider } from "../contexts/AuthContext"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
// import Dashboard from "./Dashboard"
import Login from "./Sign/Login"
import PrivateRoute from "./PrivateRoute"
import ForgotPassword from "./Sign/ForgotPassword"
// import UpdateProfile from "./UpdateProfile"
import Landing from "./Basics/Landing"
import Myprofile from "./Sign/Myprofile"
// import Chat from "./Chats/Chat"
import AboutUs from "./Basics/AboutUs";
import Add_details from "./Sign/Add_details";
import '../css/app.css'
import LocationWise from "./ShowJobs/LocationWise";
import Chat_api from "./Chats/Chat_api";
import AskQuestion from "./Chats/AskQuestion"

function App() {
  return (
        <Router>
          
          <AuthProvider>
          
              <Switch>
                {/* <PrivateRoute exact path="/" component={Dashboard} /> */}
                
                {/* <PrivateRoute path="/update-profile" component={UpdateProfile} /> */}
                
                <Route exact path="/" component={Landing} />
                <Route path="/chat" component={Chat_api} />
                <Route path="/forgot-password" component={ForgotPassword} />
                <Route path="/about" component={AboutUs} />
                <PrivateRoute path="/add_details" component={Add_details} />
                <PrivateRoute path="/ask_question" component={AskQuestion} />
                <PrivateRoute path="/myprofile" component={Myprofile} />
                <PrivateRoute path="/locationwise" component={LocationWise} />
          
                <div className="outer">
                <div className="inner">
                
                  <Route path="/signup" component={Signup} />
                  <Route path="/login" component={Login} />
                  
                </div>
                </div>
                
              </Switch>
          </AuthProvider>
        </Router>
  )
}

export default App
