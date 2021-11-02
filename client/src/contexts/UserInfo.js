// import React, { useContext, useState, useEffect } from "react"
// import { useAuth } from "./AuthContext"
// import { firestore } from "../firebase"

// const UserContext = React.createContext()

// export function useUser() {
//   return useContext(UserContext)
// }

// export function UserProvider({ children }) {
//   const [userinfo, setUserinfo] = useState()
//   const [loading, setLoading] = useState(true)
//   const {currentUser} = useAuth()


//   useEffect(()=>{
//     const unsubscribe = firestore.collection("users").doc(currentUser.uid)
//     .get()
//     .then((doc) => {
//         if (doc.exists) {
//         setUserinfo(doc.data())
//         setLoading(false)
//       }})
//       .catch((error) => {
//         console.log("Error getting document:", error);
//     });

//     return unsubscribe

//   },[])

//   const value = {userinfo}

//   return (
//     <UserContext.Provider value={value}>
//       {!loading && children}
//     </UserContext.Provider>
//   )
// }