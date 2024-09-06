import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyDrJcizP-4L2oVxasmlulXUPbrC9TiMhhU",
  authDomain: "netflix-clone-35eab.firebaseapp.com",
  projectId: "netflix-clone-35eab",
  storageBucket: "netflix-clone-35eab.appspot.com",
  messagingSenderId: "1091317143987",
  appId: "1:1091317143987:web:c07369d657071f98a3d3c6",
  measurementId: "G-7TNVCX47FP"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth(app);
const db = getFirestore(app);

const signUp = async (name , email , password) =>{
    try{
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await addDoc(collection(db, "users"), {
            uid: user.uid,
            name,
            authProvider: 'local',
            email,
        })
    }
    catch(err){
        // console.error(err);
        toast.error(err.code.split('/')[1].split('-').join(" "));
    }
}

const login = async (email , password) =>{
    try{
        await signInWithEmailAndPassword(auth, email, password);
    }
    catch(err){
        console.error(err);
        toast.error(err.code.split('/')[1].split('-').join(" "));
    }
}


const logout = () =>{
    signOut(auth);
}

export { auth , db , signUp , login , logout };