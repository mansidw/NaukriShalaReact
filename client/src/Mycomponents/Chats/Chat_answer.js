import React,{useEffect,useState} from 'react'
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import Button from '@material-ui/core/Button';
import { firestore } from "../../firebase";
import firebase from 'firebase/app';

const Chat_answer = (props) => {
    var d = props.answer.timestamp.toDate()
    const [upvote,setUpvote] = useState(props.answer.upvotes)
    const [downvote,setDownvote] = useState(props.answer.downvotes)


    function handleVotesU() {
        setUpvote((prev)=>prev+1)
        firestore.collection("post_answers")
        .doc(props.aid)
        .update({
            "upvotes":firebase.firestore.FieldValue.increment(1)
        })
        .catch((error) => {
            console.log("Error getting document:", error);
        });
        
    }

    function handleVotesD() {
        setDownvote((prev)=>prev+1)
        firestore.collection("post_answers")
        .doc(props.aid)
        .update({
            "downvotes":firebase.firestore.FieldValue.increment(1)
        })
        .catch((error) => {
            console.log("Error getting document:", error);
        });
        
    }

    // useEffect(()=>{
    //     firestore.collection("post_answers")
    //     .where("question_id", "==", props.qid)
    //     .get()
    //     .then((alldocs) => {
    //         alldocs.forEach((doc) => {
    //             setdbAnswers((prev)=>[...prev,doc])
    //         });
    //     })
    //     .catch((error) => {
    //         console.log("Error getting document:", error);
    //     });
    // },[])

    return (
        <>
        <div className="postcard__preview-txt">{props.answer.answer}</div>
        <ul className="postcard__tagbox">
            <Button onClick={handleVotesU}><ThumbUpIcon style={{ fontSize: 20,color:'#082032'}}/></Button>
            <div className="postcard__subtitle medium">{upvote}</div>
            <Button onClick={handleVotesD}><ThumbDownIcon style={{ fontSize: 20,color:'#082032'}}/></Button>
            <div className="postcard__subtitle medium">{downvote}</div>
            
        </ul>
        <div className="postcard__subtitle medium">
            {d.getDate()+"/"+d.getMonth()+"/"+d.getFullYear()+" "+d.getHours()+":"+d.getMinutes()}
        </div>
        <div className="postcard__bar"></div>
        </>
    )
}

export default Chat_answer
