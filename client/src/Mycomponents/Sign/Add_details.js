import React, { useRef, useState } from "react"
import { Form, Card, Alert } from "react-bootstrap"
import { Link, useHistory } from "react-router-dom"
import { firestore } from "../../firebase";
import { useAuth } from "../../contexts/AuthContext"
import {withStyles, makeStyles} from '@material-ui/core/styles';
import { blueGrey } from '@material-ui/core/colors';
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css"
import Button from '@material-ui/core/Button';
import axios from 'axios'


const ColorButton = withStyles((theme) => ({
    root: {
      color: theme.palette.getContrastText(blueGrey[500]),
      fontFamily:'Raleway',
      backgroundColor: blueGrey[500],
      '&:hover': {
        backgroundColor: blueGrey[700],
      },
    },
  }))(Button);
  
  const useStyles = makeStyles((theme) => ({
    margin: {
        margin: theme.spacing(1),
    },
  }));

const Add_details = () => {
    const classes = useStyles();
    const nameRef = useRef()
    const locationRef = useRef()
    const qualRef = useRef()
    const { currentUser } = useAuth()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const history = useHistory()

    function handleSubmit(e) {
        e.preventDefault()

        setLoading(true)
        setError("")

        firestore.collection("users").doc(currentUser.uid).set({
            name:nameRef.current.value,
            location:locationRef.current.value,
            qualification:qualRef.current.value,
            email:currentUser.email
          })
          .then(() => {
            history.push("/home")
           })
          .catch((error) => {
            setError("Failed to update account")
            console.error("Error writing document: ", error);
          })
          .finally(() => {
            setLoading(false)
          })

///////////////////////////////////// community chat///////////////////////////////////
          // var data = {
          //   "username": currentUser.email.slice(0,currentUser.email.indexOf('@')),
          //   "secret": currentUser.uid,
          //   "email": currentUser.email,
          //   "first_name": nameRef.current.value.slice(0,nameRef.current.value.indexOf(' ')),
          //   "last_name": nameRef.current.value.slice(nameRef.current.value.indexOf(' ')+1)
          // }
          
          // var config = {
          //   method: 'post',
          //   url: 'https://api.chatengine.io/users/',
          //   headers: {
          //     'PRIVATE-KEY': '4354341d-d8c7-4d65-9640-3f1aaaed2899'
          //   },
          //   data : data
          // }

          // axios(config)
          // .then(function (response) {
          //   console.log(JSON.stringify(response.data));
          // })
          // .catch(function (error) {
          //   console.log(error);
          // });
          
///////////////////////////////////// community chat///////////////////////////////////
        
    }
    return (
        <>
        <div className="outer">
        <div className="inner">
            <Card className="provide_color">
                <Card.Body>
                <h2 className="text-center mb-4">Additional Details</h2>
                {error && <Alert variant="danger">{error}</Alert>}

                <Form onSubmit={handleSubmit}>

                    <Form.Group id="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type="text"
                        ref={nameRef}
                        required
                    />
                    </Form.Group>

                    <Form.Group id="location">
                    <Form.Label>Location</Form.Label>
                    <Form.Control
                        type="text"
                        ref={locationRef}
                        required
                    />
                    </Form.Group>

                    <Form.Group id="qual">
                    <Form.Label>Qualification</Form.Label>
                    <Form.Control
                        type="text"
                        ref={qualRef}
                        required
                    />
                    </Form.Group>

                    <ColorButton variant="contained" color="primary" disabled={loading} className={classes.margin} className="w-100 mt-4" type="submit">
                        Add
                    </ColorButton>
                    
                </Form>
                <div className="w-100 text-center mt-3">
                    <Link to="/home">Go Back</Link>
                </div>
                </Card.Body>
            </Card>
      </div>
      </div>
    </>
    )
}

export default Add_details
