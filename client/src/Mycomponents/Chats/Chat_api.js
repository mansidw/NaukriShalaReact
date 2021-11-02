import React from 'react'
import { ChatEngineWrapper, ChatSocket, ChatFeed } from 'react-chat-engine'
import { useAuth } from "../../contexts/AuthContext"


const Chat_api = () => {
    const { currentUser } = useAuth()
    // console.log(currentUser.email.slice(0,currentUser.email.indexOf('@')))
    let username ='XXX'
    if(currentUser){
        username = currentUser.email.slice(0,currentUser.email.indexOf('@'))
    }
    return (
       
        <ChatEngineWrapper>
       
            <ChatSocket 
                projectID='f7259fda-c961-4e42-b74e-ff99901fa5d8'
                chatID='51219'
                chatAccessKey='ca-c89fb699-c8d8-4b57-87d2-c3e8358ef947'
                senderUsername={username}
            />

            <ChatFeed 
                activeChat='51219' />
        </ChatEngineWrapper>
       
    )
}

export default Chat_api
