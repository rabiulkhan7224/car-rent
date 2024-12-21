import { createContext, useEffect, useState } from "react";
import auth from "../firebase/firebase.config";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";

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