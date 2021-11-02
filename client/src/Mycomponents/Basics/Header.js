import React, { useState } from 'react'
import { Alert } from "react-bootstrap"
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import WorkIcon from '@material-ui/icons/Work';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Link as RouterLink } from 'react-router-dom';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { useAuth } from "../../contexts/AuthContext"
import { useHistory } from "react-router-dom"


const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  appbar:{
    backgroundColor: "#87A7B3",
    fontFamily: "Raleway",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    color:'white'
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));



export const Header = () => {
    const [error, setError] = useState("")
    const { currentUser, logout } = useAuth()
    const history = useHistory()
    const classes = useStyles();
    const [jobtype, setjobtype] = useState('');

    async function handleLogout() {
        setError("")
    
        try {
          await logout()
          history.push("/login")
        } catch {
          setError("Failed to log out")
        }
      }
    

    const handleChange = (event) => {
        setjobtype(event.target.value);
        history.push("/"+event.target.value)
    };

    return (
        <>
    <CssBaseline />
    {error && <Alert variant="danger">{error}</Alert>}
      <AppBar position="relative" className={classes.appbar}>
        <Toolbar>
          <WorkIcon className={classes.icon} style={{'color':'#082032'}} onClick={()=>console.log("mansi")}/>
          <Typography variant="h6" color="inherit" noWrap className={classes.appbar} style={{ flex: 1 }}>
              {currentUser ?
                <>
                    <FormControl className={classes.formControl}>
                        <Select
                        value={jobtype}
                        onChange={handleChange}
                        displayEmpty
                        className={classes.selectEmpty}
                        inputProps={{ 'aria-label': 'Without label' }}
                        style={{'fontFamily': "Raleway",'color':'white','fontWeight':'bold'}}
                        >
                            <MenuItem value="" disabled style={{'color':'white','fontFamily': "Raleway",'backgroundColor':'#082032'}}>SHOW JOBS</MenuItem>
                            <MenuItem value='locationwise' style={{'color':'white','fontFamily': "Raleway",'backgroundColor':'#082032'}}>Location Wise</MenuItem>
                            <MenuItem value='recboard' style={{'color':'white','fontFamily': "Raleway",'backgroundColor':'#082032'}}>Qualification Wise</MenuItem>
                        </Select>
                        {/* <FormHelperText style={{'color':'white','fontFamily': "Raleway",}}>JOB TYPE</FormHelperText> */}
                    </FormControl>
                </>  : <></>
            }


          </Typography>
          
          <Button color="primary" className="button" component={RouterLink} to="/chat" size="large" variant="contained" style={{'backgroundColor':'#082032','margin':'5px','textDecoration':'none'}}>
            Chat
          </Button>

          <Button color="primary" className="button" component={RouterLink} to="/about" size="large" variant="contained" style={{'backgroundColor':'#082032','margin':'5px','textDecoration':'none'}}>
            About Us
          </Button>

          {currentUser ? 
          <> 
          <Button color="primary" className="button" component={RouterLink} to="/ask_question" size="large" variant="contained" style={{'backgroundColor':'#082032','margin':'5px','textDecoration':'none'}}>
            Ask Question
          </Button>
          <Button color="primary" className="button" component={RouterLink} to="/myprofile" size="large" variant="contained" style={{'backgroundColor':'#082032','margin':'5px','textDecoration':'none'}}>
            My Profile
          </Button>
          <Button color="primary" className="button" component={RouterLink} size="large" variant="contained" onClick={handleLogout} style={{'backgroundColor':'#082032','margin':'5px','textDecoration':'none'}}>
            Logout
          </Button> 
          </>
          : <><Button color="primary" className="button" component={RouterLink} size="large" variant="contained" to="/login" style={{'backgroundColor':'#082032','margin':'5px','textDecoration':'none'}}>
            Login
            </Button>
            <Button color="primary" className="button" component={RouterLink} size="large" variant="contained" to="/signup"  style={{'backgroundColor':'#082032','margin':'5px','textDecoration':'none'}}>
            SignUp
            </Button></>
            }

          

        </Toolbar>
      </AppBar>
      </>
    )
}
