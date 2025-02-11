import { createContext, useEffect, useState } from "react";
import auth from "../firebase/firebase.config";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import axios from "axios";

export const AuthContext=createContext(null);

const AuthProvider = ({children}) => {
    const [user,setUser]=useState(null)
    const [loader,setLoader]=useState(true)
    const registerUser=(email,password)=>{

       return createUserWithEmailAndPassword(auth,email,password)
    }
    const loginUser=(email,password)=>{
        setLoader(true)
       return signInWithEmailAndPassword(auth,email,password)
    }
    const logoutUser=()=>{
        
        return signOut(auth)
    }
    const updateUserProfile=(updateData)=>{
        
        return updateProfile(auth.currentUser,updateData)
    }


    const authInfo={
        user,
        registerUser,
        loginUser,
        logoutUser,
        updateUserProfile,
        loader,
        setLoader,
        
        
    }
    useEffect(()=>{
        const unsubscribe =  onAuthStateChanged(auth,(currentUser)=>{
            setUser(currentUser)
            setLoader(false)
           
            if(currentUser?.email){
                const user={email:currentUser.email}
                  axios.post(`${import.meta.env.VITE_url}/jwt`,user,{withCredentials:true})
                  .then(res=>console.log('login',res.data))
              }else{
                axios.post(`${import.meta.env.VITE_url}/logout`,{},{withCredentials:true})
                .then(res=>console.log('logout:',res.data))
              }
              
        })
        return()=>unsubscribe()
    },[auth])
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;