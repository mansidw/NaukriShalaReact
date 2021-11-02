import React,{useEffect,useRef,useState} from 'react'
import { useAuth } from "../../contexts/AuthContext"
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import LiveHelpIcon from '@material-ui/icons/LiveHelp';
import { Footer } from '../Basics/Footer'
import { Header } from '../Basics/Header'
import TextField from '@material-ui/core/TextField';
import SendRoundedIcon from '@material-ui/icons/SendRounded';
import {
    withStyles,
    createTheme,
  } from '@material-ui/core/styles';
import '../../css/card.css'
import { firestore } from "../../firebase";
import MyQuestion from './MyQuestion'


const CssTextField = withStyles({
    root: {
        '& label.Mui-focused': {
        color: '#87A7B3',
        },
        '& .MuiInput-underline:after': {
        borderBottomColor: '#87A7B3',
        },
},
})(TextField);


const theme = createTheme({
    palette: {
        primary: {
            main: '#fff',
            contrastText: '#fff',
          },
    },
});

const useStyles = makeStyles((theme) => ({
root: {
    display: 'flex',
    flexWrap: 'wrap',
},
margin: {
    margin: theme.spacing(1),
},
}));


const Chat = () => {
    const classes = useStyles();
    const { currentUser } = useAuth()
    const divRef = useRef(null);
    const [myValue, setValue] = useState('') 
    const [helper,setHelper] = useState("")
    const [dbQuestions,setdbQuestions] = useState([])
    const [qid,setQid] = useState()


    const sendMessage = (e)=>{
        e.preventDefault();
        if(myValue){
            firestore.collection("post_questions")
            .add({
                user_id:currentUser.uid,
                question:myValue,
                timestamp:Date.now(),
            })
            .then((docRef) => {
                console.log("Document written with ID: ", docRef.id);
                setQid(docRef.id)
                setHelper(myValue)
            })
            .catch((error) => {
                console.error("Error adding document: ", error);
            });
            divRef.current.style.display='none'
        }
        setValue("")
    }
    
    const hideForm = ()=>{
        var whatisit = divRef.current.style.display
        if(whatisit === 'none'){
            divRef.current.style.display='block'
        }
        else{divRef.current.style.display='none'}
    }

    useEffect(()=>{
        firestore.collection("post_questions")
        .get()
        .then((alldocs) => {
            alldocs.forEach((doc) => {
                setdbQuestions((prev)=>[...prev,doc])
            });
        })
        .catch((error) => {
            console.log("Error getting document:", error);
        });
    },[])


    return (
        <>
        <Header/>
        <div style={{'paddingBottom':'120px'}}>
        {dbQuestions.map((item)=>{
            return(<MyQuestion question={item.data()} key={item.id} qid={item.id} dbq="yes"/>)
        })}
        {helper ? <MyQuestion question={helper} key={qid} qid={qid} dbq=""/>:<></>}
            <Grid container direction="row" justifyContent="flex-start" alignItems="center" style={{'position':'fixed','bottom':'120px'}} >
                    <Tooltip title="Ask a question?" placement="top" >
                        <Button onClick={hideForm}><LiveHelpIcon style={{ fontSize: 60, color: '#87A7B3' }}/></Button>
                    </Tooltip>

                    <form className={classes.root} onSubmit={sendMessage}>
                        <div ref={divRef} style={{'display':'none','position':'fixed','bottom':'120px','direction':"row",'justifyContent':"flex-start",'alignItems':"center"}}>
                            <CssTextField className={classes.margin} id="custom-css-standard-input" label="Ask a question?" value={myValue} onChange={(e) => setValue(e.target.value)}/>
                            <Tooltip title="Send" placement="top">
                                <Button type="submit"><SendRoundedIcon style={{ fontSize: 40, color: '#87A7B3' }}/></Button>
                            </Tooltip>
                        </div>
                    </form>
            </Grid>
            </div>
        <Footer/>
        </>
    )
}

export default Chat
