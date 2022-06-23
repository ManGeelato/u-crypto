import { createContext, useContext, useState, useEffect } from "react";
import { authentication, database } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

const UserContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState({});

  const signUp = (email, password) => {
    createUserWithEmailAndPassword(authentication, email, password);
    return setDoc(doc(database, "users", email), {
      myCoins: [],
    });
  };

  const signIn = (email, password) => {
    return signInWithEmailAndPassword(authentication, email, password);
  };

  const logout = () => {
    return signOut(authentication);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(authentication, (currentUser) => {
        setUser(currentUser)
    })
    return () => {
        unsubscribe();
    }
  }, [])

  return (
    <UserContext.Provider value={{signUp, signIn, logout, user}}>
        {children}
    </UserContext.Provider> 
  )
};

export const UserAuth = () =>{
    return useContext(UserContext);
}
