import Axios from "axios";
import React from "react";
import {
    GoogleAuthProvider,
    getAuth,
    signInWithPopup,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    sendPasswordResetEmail,
    signOut,
} from "firebase/auth";
// import {
//     getFirestore,
//     query,
//     getDocs,
//     collection,
//     where,
//     addDoc,
// } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAQPWZwAjHAaT-9cSvGpyYexkiZ0NSPP70",
    authDomain: "luniko-enhancement-mysql.firebaseapp.com",
    projectId: "luniko-enhancement-mysql",
    storageBucket: "luniko-enhancement-mysql.appspot.com",
    messagingSenderId: "597214047017",
    appId: "1:597214047017:web:4c445b1f855b3b53c4a538",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// DB Functions
const [uidList, setUIDList] = useState([]);

const getUIDs = () => {
    Axios.get("http://localhost:3001/uid", {
    }).then((response) => {
        setUIDList(response.data);
    });
};

const [firstName, setFirstName] = useState("");
const [lastName, setLastName] = useState("");
const [email, setEmail] = useState("");

const addPersonnel = () => {
    Axios.post("http://localhost:3001/create", {
        firstName: firstName,
        lastName: lastName,
        email: email
    }).then(() => {
        console.log("New user added!");
    });
};

// Google authentication
const googleProvider = new GoogleAuthProvider();

const signInWithGoogle = async () => {
    try {
        const res = await signInWithPopup(auth, googleProvider);
        const user = res.user;
        getUIDs();
        // const q = query(collection(db, "users"), where("uid", "==", user.uid));
        // const docs = await getDocs(q);
        if (!uidList.includes(user.id)) {
            setFirstName(user.displayName.split(" ")[0]);
            setLastName(user.displayName.split(" ")[1]);
            setEmail(user.email);
        }

        addPersonnel();

        // await addDoc(collection(db, "users"), {
        //     uid: user.uid,
        //     name: user.displayName,
        //     authProvider: "google",
        //     email: user.email,
        // });

    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};

// Standard Authentication
const signInWithEmailAndPassword = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};

// Register with email and password
const registerWithEmailAndPassword = async (name, email, password) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;

        setFirstName(name.split(" ")[0]);
        setLastName(name.split(" ")[1]);
        setEmail(email);

        addPersonnel();

        //   await addDoc(collection(db, "users"), {
        //     uid: user.uid,
        //     name,
        //     authProvider: "local",
        //     email,
        //   });
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};

// Send a password reset link to an email address
const sendPasswordReset = async (email) => {
    try {
        await sendPasswordResetEmail(auth, email);
        alert("Password reset link sent!");
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};

// Logout
const logout = () => {
    signOut(auth);
};

export {
    auth,
    signInWithGoogle,
    signInWithEmailAndPassword,
    registerWithEmailAndPassword,
    sendPasswordReset,
    logout
};