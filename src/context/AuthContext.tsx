import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from '../firebase';
import { 
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
} from "firebase/auth";
import { setDoc, doc } from 'firebase/firestore';
import type { User, UserCredential } from "firebase/auth";

interface AuthContextType {
    user: User | null;
    signUp: (email: string, password: string) => Promise<UserCredential>;
    signIn: (email: string, password: string) => Promise<UserCredential>;
    logOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthContextProvider({children}: {children: React.ReactNode}) {
    const [user, setUser] = useState<User | null>({} as User);

    function signUp (email: string, password: string){
    const userCredential = createUserWithEmailAndPassword(auth, email, password);

      setDoc(doc(db, 'users', email ), {
        savedMovies: [],
      });

        return userCredential;
    }

    function signIn (email: string, password: string){
        return signInWithEmailAndPassword(auth, email, password);
    }

    function logOut (){
        return signOut(auth);
    }

    useEffect(() => {
        const unsuscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return () => {
            unsuscribe();
        }
    })

    return(
        <AuthContext.Provider value={{ user, signUp, signIn, logOut }}>
            {children}
        </AuthContext.Provider>
    )

}

export function UserAuth(){
    return useContext(AuthContext);
}