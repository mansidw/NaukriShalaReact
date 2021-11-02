import React,{useState,useEffect} from 'react'
// import CreateIcon from '@material-ui/icons/Create';
// import Button from '@material-ui/core/Button';
// import Tooltip from '@material-ui/core/Tooltip';
import Chat_answer from './Chat_answer';
// import TextField from '@material-ui/core/TextField';
// import Dialog from '@material-ui/core/Dialog';
// import DialogActions from '@material-ui/core/DialogActions';
// import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
// import DialogTitle from '@material-ui/core/DialogTitle';
import { firestore } from "../../firebase";


const Chat_question = (props) => {
    const [open, setOpen] = useState(false);
    const [myValue, setValue] = useState('')
    const [helper,setHelper] = useState("") 
    const [dbAnswers,setdbAnswers] = useState([])

    const addAnswer = (e)=>{
        e.preventDefault()
        setOpen(false);
        if(myValue){
            setHelper(myValue)
        }
        setValue("")
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    useEffect(()=>{
        firestore.collection("post_answers")
        .where("question_id", "==", props.qid)
        .get()
        .then((alldocs) => {
            alldocs.forEach((doc) => {
                setdbAnswers((prev)=>[...prev,doc])
            });
        })
        .catch((error) => {
            console.log("Error getting document:", error);
        });
    },[])


    return (
        <section className="light">
            <div className="container py-2">
                <article className="postcard light yellow">
                    <div className="postcard__text t-dark">
                        <h1 className="postcard__title yellow">{props.dbq ? props.question.question : props.question}</h1>
                        {dbAnswers.map((item)=>{
                            return(<Chat_answer answer={item.data()} key={item.id} aid={item.id}/>)
                        })}
                        

                        {/* <ul className="postcard__tagbox">
                            <Tooltip title="Answer the thread!" placement="bottom">
                                <Button onClick={handleClickOpen}><CreateIcon style={{ fontSize: 35,color:'#082032'}}/></Button>
                            </Tooltip>
                            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                                <DialogTitle id="form-dialog-title" style={{'fontFamily': 'Raleway'}}>Your Answer</DialogTitle>
                                <form onSubmit={addAnswer}>
                                    <DialogContent>
                                        <DialogContentText style={{'fontFamily': 'Raleway'}}>
                                        Write something here that should contain atleast 19 words so that the box spans properly to it's entire width.
                                        </DialogContentText>
                                        <TextField
                                        autoFocus
                                        margin="dense"
                                        id="name"
                                        label="Answer"
                                        type="text"
                                        style={{'fontFamily': 'Raleway'}}
                                        fullWidth
                                        value={myValue} 
                                        onChange={(e) => setValue(e.target.value)}
                                        />
                                    </DialogContent>
                                    <DialogActions>
                                        <Button type='submit' color="primary" style={{'fontFamily': 'Raleway'}}>
                                            Post Answer
                                        </Button>
                                        <Button onClick={handleClose} color="primary" style={{'fontFamily': 'Raleway'}}>
                                            Cancel
                                        </Button>
                                    </DialogActions>
                                </form>
                            </Dialog>  
                        </ul> */}
                    </div>
                </article>
            </div>
        </section>
    )
}

export default Chat_question
